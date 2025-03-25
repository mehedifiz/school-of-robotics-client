// src/pages/books/BookReading/BookReading.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaBook, FaCheckCircle, FaChevronRight, FaLock, FaQuestionCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import useAuth from "@/Hooks/useAuth";
import useSecurityMeasures from "@/Hooks/useSecurityMeasures";
import Loader from "@/components/shared/Loader";
import PDFViewer from "@/components/utility/PDFViewer";

const BookReading = () => {
  const { bookId, chapterId } = useParams();
  const [activeChapter, setActiveChapter] = useState(null);
  const [bookProgress, setBookProgress] = useState(null);
  const navigate = useNavigate();
  const axios = useAxios();
  const { user } = useAuth();
  const location = useLocation();

  // Fetch book details
  const { data: bookData, isLoading: bookLoading } = useQuery({
    queryKey: ["book-reading", bookId],
    queryFn: async () => {
      const res = await axios.get(`/book/${bookId}`);
      return res.data;
    },
  });

  const book = bookData?.data || {};

  // Fetch chapters for the book
  const { data: chaptersData, isLoading: chaptersLoading } = useQuery({
    queryKey: ["book-chapters", bookId],
    queryFn: async () => {
      const res = await axios.get(`/book/get-chapter/${bookId}`);
      return res.data;
    },
    enabled: !!bookId,
  });

  const chapters = chaptersData?.data || [];

  // Fetch user's progress for this book
  const {
    data: progressData,
    isLoading: progressLoading,
    refetch: refetchProgress,
  } = useQuery({
    queryKey: ["book-progress", bookId, user?._id],
    queryFn: async () => {
      const res = await axios.get(`/user/book-progress/${bookId}`);
      return res.data;
    },
    enabled: !!bookId && !!user?._id,
  });

  // Add a new query to fetch quiz submission data
  const { data: quizData, isLoading: quizLoading } = useQuery({
    queryKey: ["chapter-quiz", activeChapter?.quizId, user?._id],
    queryFn: async () => {
      if (!activeChapter?.quizId) return null;
      try {
        const res = await axios.get(`/quiz/get-quiz-by-chapter/${activeChapter._id}`);
        return res.data.data;
      } catch (error) {
        // Quiz might not exist for this chapter
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!activeChapter?.quizId && !!user?._id,
  });

  // Set active chapter based on route params or default to first chapter
  useEffect(() => {
    if (chapters.length > 0) {
      if (chapterId) {
        const chapter = chapters.find((ch) => ch._id === chapterId);
        if (chapter) {
          setActiveChapter(chapter);

          // Update last read chapter in the database
          axios
            .post("/user/update-last-read", {
              bookId,
              chapterId: chapter._id,
            })
            .catch((err) => console.error("Error updating last read chapter:", err));
        } else {
          setActiveChapter(chapters[0]);
          navigate(`/dashboard/book-reading/${bookId}/chapter/${chapters[0]._id}`, { replace: true });
        }
      } else if (chapters.length > 0) {
        setActiveChapter(chapters[0]);
        navigate(`/dashboard/book-reading/${bookId}/chapter/${chapters[0]._id}`, { replace: true });
      }
    }
  }, [bookId, chapterId, chapters, navigate, axios]);

  // Set book progress from API data
  useEffect(() => {
    if (progressData?.data) {
      setBookProgress(progressData.data);
    }
  }, [progressData]);

  useEffect(() => {
    // Refresh progress data whenever the component mounts or becomes visible
    if (bookId && user?._id) {
      refetchProgress();

      // Log progress data for debugging
      console.log("Refreshing progress data", bookId, user?._id);
    }
  }, []);

  // Protect Unlocked Chapters from Direct URL Access
  useEffect(() => {
    // Skip protection if coming from quiz completion
    if (location.state?.justCompletedQuiz) {
      // Optionally force refetch progress to update the local state
      refetchProgress();
      return;
    }

    // Check if the current chapter is unlocked
    if (activeChapter && chapters.length > 0 && !isChapterUnlocked(activeChapter)) {
      toast.error("This chapter is locked. Complete the previous chapters first.");

      // Find the latest unlocked chapter
      const latestUnlockedChapter = chapters.find((ch) => isChapterUnlocked(ch));
      if (latestUnlockedChapter) {
        navigate(`/dashboard/book-reading/${bookId}/chapter/${latestUnlockedChapter._id}`, { replace: true });
      } else {
        navigate("/dashboard/student-book", { replace: true });
      }
    }
  }, [activeChapter, chapters, bookProgress, location.state]);

  useEffect(() => {
    // Clean up the navigation state after it's been used
    if (location.state?.justCompletedQuiz) {
      // This will clear the state after using it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // security measures
  useSecurityMeasures();

  // Check if a chapter is unlocked
  const isChapterUnlocked = (chapter) => {
    // First chapter is always unlocked
    if (chapter.chapterNo === 1) return true;

    // If no progress data yet, only first chapter is unlocked
    if (!bookProgress) return false;

    // A chapter is unlocked if the previous chapter is in completedChapters
    const previousChapterIndex = chapter.chapterNo - 2;
    if (previousChapterIndex < 0) return true;

    const previousChapter = chapters[previousChapterIndex];
    if (!previousChapter) return false;

    // Check if previous chapter ID exists in completedChapters
    // Make sure we're comparing strings to strings for consistency
    return bookProgress.completedChapters.some((id) => id.toString() === previousChapter._id.toString());
  };

  // Handle take quiz button click
  const handleTakeQuiz = () => {
    if (activeChapter && activeChapter.quizId) {
      if (quizData?.userSubmission) {
        // If quiz is already submitted, go to details view
        navigate(`/dashboard/quiz-details/${bookId}/chapter/${activeChapter._id}/submission/${quizData.userSubmission._id}`);
      } else {
        // If quiz is not submitted, go to quiz page
        navigate(`/dashboard/book-quiz/${bookId}/chapter/${activeChapter._id}`);
      }
    } else {
      toast.error("No quiz available for this chapter.");
    }
  };

  // Handle next chapter button click
  const handleNextChapter = () => {
    if (activeChapter && chapters.length > 0) {
      const currentIndex = chapters.findIndex((ch) => ch._id === activeChapter._id);
      if (currentIndex < chapters.length - 1) {
        const nextChapter = chapters[currentIndex + 1];
        if (isChapterUnlocked(nextChapter)) {
          navigate(`/dashboard/book-reading/${bookId}/chapter/${nextChapter._id}`);
        } else {
          toast.error("Complete the current chapter's quiz to unlock the next chapter.");
        }
      } else {
        toast.success("You've completed all chapters in this book!");
      }
    }
  };

  if (bookLoading || chaptersLoading || progressLoading) {
    return <Loader />;
  }

  if (!activeChapter) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Chapter Found</h2>
          <p className="text-gray-600 mb-6">The requested chapter could not be found.</p>
          <Link to={`/book-details/${bookId}`} className="inline-flex items-center text-primary hover:underline">
            <FaArrowLeft className="mr-2" /> Back to Book Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link to="/dashboard/student-book" className="inline-flex items-center text-primary hover:underline">
          <FaArrowLeft className="mr-2" /> Back to My Books
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content - PDF Viewer */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{book.name}</h1>
            <h2 className="text-xl text-gray-600">
              Chapter {activeChapter.chapterNo}: {activeChapter.title}
            </h2>
          </div>

          <PDFViewer pdfUrl={activeChapter.pdfUrl} title={`Chapter ${activeChapter.chapterNo}: ${activeChapter.title}`} />

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between">
            {quizData?.userSubmission ? (
              <div className="bg-white border border-gray-200 rounded-lg px-6 py-3 flex items-center gap-3">
                <div className={`p-2 rounded-full ${quizData.userSubmission.passed ? "bg-green-100" : "bg-amber-100"}`}>
                  {quizData.userSubmission.passed ? (
                    <FaCheckCircle className="text-green-600 text-lg" />
                  ) : (
                    <FaQuestionCircle className="text-amber-600 text-lg" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{quizData.userSubmission.passed ? "Quiz Passed" : "Quiz Attempted"}</div>
                  <div className="text-sm text-gray-500">
                    Score: {quizData.userSubmission.score * (100 / 10)}% •{new Date(quizData.userSubmission.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <button onClick={handleTakeQuiz} className="ml-4 text-primary text-sm hover:underline">
                  View Details
                </button>
              </div>
            ) : (
              <button
                onClick={handleTakeQuiz}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <FaQuestionCircle /> Take Chapter Quiz
              </button>
            )}

            <button
              onClick={handleNextChapter}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg flex items-center justify-center gap-2"
              disabled={chapters.indexOf(activeChapter) === chapters.length - 1}
            >
              Next Chapter <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Sidebar - Chapter List */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Chapters</h3>
            <div className="space-y-2">
              {chapters.map((chapter) => {
                const isUnlocked = isChapterUnlocked(chapter);
                const isActive = activeChapter._id === chapter._id;
                const isCompleted = bookProgress?.completedChapters.includes(chapter._id);

                return (
                  <div
                    key={chapter._id}
                    className={`p-3 rounded-lg border ${
                      isActive ? "border-primary bg-primary/5" : isUnlocked ? "border-gray-200 hover:bg-gray-50" : "border-gray-200 bg-gray-50 opacity-70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {isUnlocked ? (
                        <Link
                          to={`/dashboard/book-reading/${bookId}/chapter/${chapter._id}`}
                          className={`flex-1 ${isActive ? "font-medium text-primary" : ""}`}
                        >
                          <div className="flex items-center">
                            <span className="mr-2">Chapter {chapter.chapterNo}:</span>
                            <span className="truncate">{chapter.title}</span>
                          </div>
                        </Link>
                      ) : (
                        <div className="flex-1 text-gray-500">
                          <div className="flex items-center">
                            <span className="mr-2">Chapter {chapter.chapterNo}:</span>
                            <span className="truncate">{chapter.title}</span>
                          </div>
                        </div>
                      )}

                      <div className="ml-2">
                        {isCompleted ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : isUnlocked ? (
                          <FaBook className="text-primary" />
                        ) : (
                          <FaLock className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReading;
