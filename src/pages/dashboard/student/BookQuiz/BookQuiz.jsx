// src/pages/books/BookQuiz/BookQuiz.jsx
import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaChevronRight, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import useAuth from "@/Hooks/useAuth";
import Loader from "@/components/shared/Loader";
import Confetti from "react-confetti";

const BookQuiz = () => {
  const { bookId, chapterId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const axios = useAxios();
  const { user } = useAuth();
  const isSubmittingRef = useRef(false);

  // Fetch quiz for the chapter
  const { data: quizData, isLoading: quizLoading } = useQuery({
    queryKey: ["chapter-quiz", chapterId],
    queryFn: async () => {
      const res = await axios.get(`/quiz/get-quiz-by-chapter/${chapterId}`);
      return res.data.data;
    },
    enabled: !!chapterId,
  });

  const quiz = quizData?.quiz || null;

  // Fetch book details
  const { data: bookData, isLoading: bookLoading } = useQuery({
    queryKey: ["book-details-quiz", bookId],
    queryFn: async () => {
      const res = await axios.get(`/book/${bookId}`);
      return res.data;
    },
    enabled: !!bookId,
  });

  const book = bookData?.data || {};

  // Fetch chapter details
  const { data: chapterData, isLoading: chapterLoading } = useQuery({
    queryKey: ["chapter-details-quiz", chapterId],
    queryFn: async () => {
      const res = await axios.get(`/book/get-chapter/${bookId}`);
      const chapters = res.data.data;
      return chapters.find((ch) => ch._id === chapterId) || null;
    },
    enabled: !!bookId && !!chapterId,
  });

  const chapter = chapterData || null;

  // Submit quiz mutation
  const { mutate: submitQuiz, isPending: isSubmitting } = useMutation({
    mutationFn: async (selectedOptions) => {
      // Updated to match your backend API expectations
      return await axios.post(`/quiz/submit-quiz`, {
        quizId: quiz._id,
        selectedOptions,
      });
    },
    onSuccess: (data) => {
      isSubmittingRef.current = false;
      const result = data.data.data;
      setScore(result.percentageScore);
      setShowResults(true);
      setQuizCompleted(true);

      // Show confetti only if passed
      if (result.passed) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }

      // Mark chapter as completed regardless of pass/fail status
      axios
        .post("/user/mark-chapter-complete", {
          bookId,
          chapterId,
        })
        .then(() => {
          // Update book progress status
          toast.success("Chapter marked as completed!");
        })
        .catch((err) => {
          console.error("Error marking chapter as complete:", err);
        });

      toast.success("Quiz submitted successfully!");
    },
    onError: (error) => {
      isSubmittingRef.current = false;
      console.error("Error submitting quiz:", error);
      toast.error(error.response?.data?.message || "Failed to submit quiz");
    },
  });

  // Initialize timer when quiz loads
  useEffect(() => {
    if (!quiz || quizCompleted || isSubmitting) return;

    const timeLimit = quiz.questions.length * 120;
    setTimeLeft(timeLimit);

    // Create timer reference to access in closure
    const timerRef = { current: null };

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Clear interval immediately to prevent further calls
          clearInterval(timerRef.current);

          // Execute submission in a setTimeout to escape the current execution context
          setTimeout(() => {
            if (!isSubmittingRef.current) {
              console.log("Timer expired - submitting quiz automatically");
              isSubmittingRef.current = true;

              // Prepare final answers
              const finalAnswers = [...userAnswers];
              while (finalAnswers.length < quiz.questions.length) {
                finalAnswers.push(null);
              }

              // Add current question's selection if it exists
              if (selectedOption !== null) {
                finalAnswers[currentQuestion] = selectedOption;
              }

              const selectedOptions = finalAnswers
                .map((optionIndex, index) => {
                  const questionNo = index + 1;
                  const question = quiz.questions[index];

                  return {
                    questionNo,
                    text: optionIndex !== null ? question.options[optionIndex].text : null,
                  };
                })
                .filter((option) => option.text !== null);

              // Submit quiz directly rather than calling handleSubmitQuiz
              submitQuiz(selectedOptions);
            }
          }, 0);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quiz, quizCompleted, isSubmitting, quiz?.questions?.length]);

  // Format time left as minutes:seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle next question
  const handleNextQuestion = () => {
    // Save the current answer
    setUserAnswers((prev) => [...prev.slice(0, currentQuestion), selectedOption, ...prev.slice(currentQuestion + 1)]);

    // Move to next question
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      handleSubmitQuiz();
    }
  };

  // Handle option selection
  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    // Check the ref as well as the state
    if (isSubmitting || quizCompleted || isSubmittingRef.current) {
      return;
    }

    // Set ref to true to prevent parallel calls
    isSubmittingRef.current = true;

    // Rest of your existing function remains the same
    const finalAnswers = [...userAnswers.slice(0, currentQuestion), selectedOption, ...userAnswers.slice(currentQuestion + 1)];

    // Fill in null for unanswered questions
    while (finalAnswers.length < quiz.questions.length) {
      finalAnswers.push(null);
    }

    const selectedOptions = finalAnswers
      .map((optionIndex, index) => {
        const questionNo = index + 1;
        const question = quiz.questions[index];

        return {
          questionNo,
          text: optionIndex !== null ? question.options[optionIndex].text : null,
        };
      })
      .filter((option) => option.text !== null);

    submitQuiz(selectedOptions);
  };

  // Handle continue reading
  const handleContinueReading = () => {
    navigate(`/dashboard/book-reading/${bookId}/chapter/${chapterId}`);
  };

  // Handle next chapter
  const handleNextChapter = () => {
    // Find the next chapter in sequence
    axios
      .get(`/book/get-chapter/${bookId}`)
      .then((res) => {
        const chapters = res.data.data;
        const currentIndex = chapters.findIndex((ch) => ch._id === chapterId);

        if (currentIndex < chapters.length - 1) {
          // Navigate directly to the next chapter
          const nextChapter = chapters[currentIndex + 1];
          navigate(`/dashboard/book-reading/${bookId}/chapter/${nextChapter._id}`);
        } else {
          // If this is the last chapter, go to the dashboard
          navigate(`/dashboard/student/books`);
          toast.success("You've completed all chapters in this book!");
        }
      })
      .catch((err) => {
        console.error("Error fetching chapters:", err);
        navigate(`/dashboard/student/books`);
      });
  };

  if (quizLoading || bookLoading || chapterLoading) {
    return <Loader />;
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Quiz Found</h2>
          <p className="text-gray-600 mb-6">There is no quiz available for this chapter.</p>
          <Link to={`/dashboard/book-reading/${bookId}/chapter/${chapterId}`} className="inline-flex items-center text-primary hover:underline">
            <FaArrowLeft className="mr-2" /> Back to Chapter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      {/* Navigation */}
      <div className="mb-6">
        <Link to={`/dashboard/book-reading/${bookId}/chapter/${chapterId}`} className="inline-flex items-center text-primary hover:underline">
          <FaArrowLeft className="mr-2" /> Back to Chapter
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{book.name}</h1>
          <h2 className="text-lg text-gray-600 mb-4">
            Chapter {chapter?.chapterNo}: {chapter?.title}
          </h2>
          <h3 className="text-xl font-semibold text-primary">{quiz.title}</h3>
        </div>

        {/* Quiz Progress */}
        {!showResults && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              {timeLeft !== null && (
                <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">Time left: {formatTime(timeLeft)}</span>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}></div>
            </div>
          </div>
        )}

        {/* Quiz Content */}
        {!showResults ? (
          <div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4">{quiz.questions[currentQuestion].question}</h4>
              <div className="space-y-3">
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedOption === index ? "bg-primary/10 border-primary" : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${
                          selectedOption === index ? "bg-primary border-primary" : "border-gray-400"
                        }`}
                      >
                        {selectedOption === index && <div className="h-2 w-2 rounded-full bg-white"></div>}
                      </div>
                      <span>{option.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion < quiz.questions.length - 1 ? (
                  <>
                    Next Question <FaChevronRight className="ml-2" />
                  </>
                ) : (
                  "Submit Quiz"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Quiz Results */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
              <h4 className="text-xl font-bold mb-2">{score >= 70 ? "Congratulations! 🎉" : "Quiz Completed!"}</h4>
              <p className="text-gray-600 mb-6">
                You scored {score}% on this quiz ({Math.round((score / 100) * quiz.questions.length)} out of {quiz.questions.length} questions)
              </p>

              <div className="w-full max-w-xs mx-auto mb-6">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className={`h-4 rounded-full ${score >= 70 ? "bg-green-500" : "bg-amber-500"}`} style={{ width: `${score}%` }}></div>
                </div>
              </div>

              {score >= 70 ? (
                <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                  <FaCheck className="text-green-500" />
                  <span>You passed the quiz!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-amber-600 mb-4">
                  <FaTimes className="text-amber-500" />
                  <span>You didn't pass this time, but you can still continue.</span>
                </div>
              )}

              <p className="text-gray-600 mb-6">
                {score >= 70 ? "Great job! You've unlocked the next chapter." : "Don't worry! You can still move to the next chapter or try again later."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={handleContinueReading} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg">
                  Continue Reading
                </button>
                <button onClick={handleNextChapter} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg">
                  Next Chapter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookQuiz;
