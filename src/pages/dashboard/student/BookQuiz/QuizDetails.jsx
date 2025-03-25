import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaTimes, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import Loader from "@/components/shared/Loader";

const QuizDetails = () => {
  const { bookId, chapterId, submissionId } = useParams();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const navigate = useNavigate();
  const axios = useAxios();

  // Fetch book details
  const { data: bookData, isLoading: bookLoading } = useQuery({
    queryKey: ["book-details-quiz-review", bookId],
    queryFn: async () => {
      const res = await axios.get(`/book/${bookId}`);
      return res.data;
    },
    enabled: !!bookId,
  });

  // Fetch chapter details
  const { data: chapterData, isLoading: chapterLoading } = useQuery({
    queryKey: ["chapter-details-quiz-review", chapterId],
    queryFn: async () => {
      const res = await axios.get(`/book/get-chapter/${bookId}`);
      const chapters = res.data.data;
      return chapters.find((ch) => ch._id === chapterId) || null;
    },
    enabled: !!bookId && !!chapterId,
  });

  // Fetch quiz submission details
  const { data: submissionData, isLoading: submissionLoading } = useQuery({
    queryKey: ["quiz-submission", submissionId],
    queryFn: async () => {
      const res = await axios.get(`/quiz/get-submission/${submissionId}`);
      return res.data.data;
    },
    enabled: !!submissionId,
  });

  // Fetch quiz details to get questions and correct answers
  const { data: quizData, isLoading: quizLoading } = useQuery({
    queryKey: ["quiz-details", submissionData?.quizId],
    queryFn: async () => {
      const res = await axios.get(`/quiz/get-quiz/${submissionData.quizId}`);
      return res.data.data;
    },
    enabled: !!submissionData?.quizId,
  });

  const book = bookData?.data || {};
  const chapter = chapterData || null;
  const submission = submissionData || null;
  const quiz = quizData || null;

  const handleNextQuestion = () => {
    if (activeQuestion < quiz.questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  };

  const handleContinueReading = () => {
    navigate(`/dashboard/book-reading/${bookId}/chapter/${chapterId}`);
  };

  if (bookLoading || chapterLoading || submissionLoading || quizLoading) {
    return <Loader />;
  }

  if (!submission || !quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Details Not Found</h2>
          <p className="text-gray-600 mb-6">The requested quiz submission could not be found.</p>
          <Link to={`/dashboard/book-reading/${bookId}/chapter/${chapterId}`} className="inline-flex items-center text-primary hover:underline">
            <FaArrowLeft className="mr-2" /> Back to Chapter
          </Link>
        </div>
      </div>
    );
  }

  // Find user's selected answer for the current question
  const getCurrentQuestionAnswer = () => {
    const question = quiz.questions[activeQuestion];
    const userAnswer = submission.selectedOptions.find((option) => option.questionNo === question.questionNo);
    return userAnswer || null;
  };

  // Find correct answer for the current question
  const getCorrectAnswer = () => {
    const question = quiz.questions[activeQuestion];
    return question.options.find((option) => option.isCorrect);
  };

  // Check if user's answer was correct
  const isAnswerCorrect = () => {
    const userAnswer = getCurrentQuestionAnswer();
    const correctAnswer = getCorrectAnswer();

    if (!userAnswer) return false;
    return userAnswer.text === correctAnswer.text;
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
          <h3 className="text-xl font-semibold text-primary">{quiz.title} - Results</h3>
        </div>

        {/* Quiz Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-medium text-gray-800">Your Quiz Results</h4>
              <p className="text-gray-600">Completed on {new Date(submission.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-3 md:mt-0">
              <div className="inline-flex items-center px-4 py-2 rounded-lg">
                <span className="font-medium">Score:</span>
                <span className={`ml-2 px-3 py-1 rounded-full ${submission.passed ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                  {submission.score * (100 / 10)}% {submission.passed ? "(Passed)" : "(Not Passed)"}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className={`h-4 rounded-full ${submission.passed ? "bg-green-500" : "bg-amber-500"}`}
              style={{ width: `${submission.score * (100 / 10)}%` }}
            ></div>
          </div>

          <p className="text-sm text-gray-600">
            You answered{" "}
            {
              submission.selectedOptions.filter((answer) => {
                const question = quiz.questions.find((q) => q.questionNo === answer.questionNo);
                const correctOption = question?.options.find((opt) => opt.isCorrect);
                return correctOption?.text === answer.text;
              }).length
            }{" "}
            out of {quiz.questions.length} questions correctly.
          </p>
        </div>

        {/* Question Navigation */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveQuestion(index)}
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                activeQuestion === index ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Question Review */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">
              Question {activeQuestion + 1} of {quiz.questions.length}
            </span>
            <h4 className="text-lg font-medium text-gray-800">{quiz.questions[activeQuestion].question}</h4>
          </div>

          <div className="space-y-3 mt-4">
            {quiz.questions[activeQuestion].options.map((option, index) => {
              const isCorrect = option.isCorrect;
              const userAnswer = getCurrentQuestionAnswer();
              const wasSelected = userAnswer?.text === option.text;

              let bgColor = "bg-white border-gray-200";
              if (isCorrect) bgColor = "bg-green-50 border-green-200";
              if (wasSelected && !isCorrect) bgColor = "bg-red-50 border-red-200";

              return (
                <div key={index} className={`p-4 rounded-lg border ${bgColor}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs mr-3 ${
                          isCorrect ? "bg-green-500 text-white" : wasSelected ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className={isCorrect ? "font-medium" : ""}>{option.text}</span>
                    </div>

                    {isCorrect && <FaCheck className="text-green-500 ml-2" />}
                    {wasSelected && !isCorrect && <FaTimes className="text-red-500 ml-2" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={activeQuestion === 0}
            className="px-4 py-2 flex items-center text-gray-700 bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft className="mr-2" /> Previous
          </button>

          <button onClick={handleContinueReading} className="px-4 py-2 bg-primary text-white rounded-md">
            Back to Chapter
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={activeQuestion === quiz.questions.length - 1}
            className="px-4 py-2 flex items-center text-gray-700 bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
