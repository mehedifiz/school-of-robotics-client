import Loader from "@/components/shared/Loader";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaBook, FaList, FaPlus } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import BookSelector from "./BookSelector";
import ChapterSelector from "./ChapterSelector";
import QuizForm from "./QuizForm";
import QuizPreview from "./QuizPreview";

const ManageChaptersQuiz = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentView, setCurrentView] = useState("view"); // view, create, edit
  const axios = useAxios();

  // Fetch books
  const { data: books = [], isLoading: booksLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get("/book/get-books");
      return res.data.data;
    },
  });

  // Fetch chapters for selected book
  const {
    data: chaptersData,
    isLoading: chaptersLoading,
    refetch: refetchChapters,
  } = useQuery({
    queryKey: ["chapters", selectedBook?._id],
    queryFn: async () => {
      if (!selectedBook) return { data: [] };
      const res = await axios.get(`/book/get-chapter/${selectedBook._id}`);
      return res.data;
    },
    enabled: !!selectedBook,
  });

  const chapters = chaptersData?.data || [];

  // Fetch quiz for selected chapter
  const {
    data: quizData,
    isLoading: quizLoading,
    refetch: refetchQuiz,
  } = useQuery({
    queryKey: ["quiz", selectedChapter?._id],
    queryFn: async () => {
      if (!selectedChapter) return null;
      try {
        const res = await axios.get(`/quiz/get-quiz-by-chapter/${selectedChapter._id}`);
        return res.data.data.quiz;
      } catch (error) {
        // Quiz might not exist for this chapter
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!selectedChapter,
  });

  // Handle book selection
  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setSelectedChapter(null);
    setCurrentView("view");
  };

  // Handle chapter selection
  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setCurrentView("view");
  };

  // Handle create quiz
  const handleCreateQuiz = () => {
    setCurrentView("create");
  };

  // Handle edit quiz
  const handleEditQuiz = () => {
    setCurrentView("edit");
  };

  // Handle quiz form submission success
  const handleQuizSuccess = () => {
    refetchQuiz();
    refetchChapters();
    setCurrentView("view");
  };

  if (booksLoading) {
    return <Loader size="default" text="Loading books..." />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Chapter Quizzes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left sidebar - Book and Chapter selection */}
        <div className="lg:col-span-5 xl:col-span-5">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <BookSelector books={books} selectedBook={selectedBook} onSelectBook={handleBookSelect} />

            {selectedBook && (
              <div className="mt-6">
                <ChapterSelector chapters={chapters} selectedChapter={selectedChapter} onSelectChapter={handleChapterSelect} isLoading={chaptersLoading} />
              </div>
            )}
          </div>
        </div>

        {/* Right content area - Quiz management */}
        <div className="lg:col-span-7 xl:col-span-7">
          <div className="bg-white rounded-xl shadow-sm p-5">
            {!selectedBook ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FaBook className="text-6xl text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700">Select a Book</h3>
                <p className="text-gray-500 mt-2">Choose a book from the list to manage its chapter quizzes</p>
              </div>
            ) : !selectedChapter ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FaList className="text-6xl text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700">Select a Chapter</h3>
                <p className="text-gray-500 mt-2">Choose a chapter to create or manage its quiz</p>
              </div>
            ) : quizLoading ? (
              <div className="py-20">
                <Loader size="small" showText={false} />
              </div>
            ) : currentView === "view" ? (
              <>
                <div className="flex flex-col sm:flex-row gap-y-4 justify-between sm:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Quiz for:{" "}
                      <span className="text-primary">
                        Chapter {selectedChapter.chapterNo}: {selectedChapter.title}
                      </span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">From book: {selectedBook.name}</p>
                  </div>

                  {quizData ? (
                    <button onClick={handleEditQuiz} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      Edit Quiz
                    </button>
                  ) : (
                    <button onClick={handleCreateQuiz} className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center">
                      <FaPlus className="mr-2" /> Create Quiz
                    </button>
                  )}
                </div>

                {quizData ? (
                  <QuizPreview
                    quiz={quizData}
                    onEdit={handleEditQuiz}
                    onDeleteSuccess={handleQuizSuccess}
                    chapterId={selectedChapter._id}
                    refetchChapters={refetchChapters}
                  />
                ) : (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
                    <FiAlertCircle className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-800">No quiz found</h4>
                      <p className="text-blue-600 mt-1">This chapter doesn't have a quiz yet. Click "Create Quiz" to add one.</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <QuizForm
                mode={currentView}
                chapterId={selectedChapter._id}
                bookName={selectedBook.name}
                chapterTitle={selectedChapter.title}
                chapterNo={selectedChapter.chapterNo}
                initialData={currentView === "edit" ? quizData : null}
                onCancel={() => setCurrentView("view")}
                onSuccess={handleQuizSuccess}
                refetchChapters={refetchChapters}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageChaptersQuiz;
