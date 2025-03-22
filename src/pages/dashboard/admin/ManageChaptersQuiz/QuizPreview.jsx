import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxios from "@/Hooks/useAxios";

const QuizPreview = ({ quiz, onEdit, onDeleteSuccess, chapterId }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const axios = useAxios();

  // Delete quiz mutation
  const { mutate: deleteQuiz, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/quiz/delete-quiz/${quiz._id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Quiz deleted successfully");
      onDeleteSuccess();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete quiz");
    },
  });

  // Handle quiz deletion
  const handleDeleteQuiz = () => {
    Swal.fire({
      title: "Are you sure?",
      html: `<p>You are about to delete the quiz <strong>${quiz.title}</strong>.</p>
             <p class="text-sm text-gray-500 mt-2">This will remove the quiz and all student submissions for it. This action cannot be undone!</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuiz();
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{quiz.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <FaPen />
          </button>
          <button
            onClick={handleDeleteQuiz}
            disabled={isDeleting}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-600">
          <span className="font-medium">Total Questions:</span> {quiz.questions.length}
        </p>
      </div>

      {/* Question navigation */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quiz.questions.map((q, index) => (
          <button
            key={index}
            onClick={() => setActiveQuestion(index)}
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
              activeQuestion === index
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Question preview */}
      {quiz.questions.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 mt-4">
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">
              Question {activeQuestion + 1}
            </span>
            <h4 className="text-lg font-medium text-gray-800">{quiz.questions[activeQuestion].question}</h4>
          </div>

          <div className="space-y-3 mt-4">
            {quiz.questions[activeQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  option.isCorrect
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <span
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs mr-3 ${
                      option.isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={option.isCorrect ? "font-medium" : ""}>
                    {option.text}
                  </span>
                  {option.isCorrect && (
                    <span className="ml-2 text-green-600 text-sm">(Correct Answer)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPreview;