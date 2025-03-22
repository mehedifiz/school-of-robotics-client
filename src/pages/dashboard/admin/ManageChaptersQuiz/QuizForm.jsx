import useAxios from "@/Hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { FaPlus, FaTrash } from "react-icons/fa";
import QuestionForm from "./QuestionForm";

const QuizForm = ({ mode, chapterId, bookName, chapterTitle, chapterNo, initialData, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    questions: [createEmptyQuestion()],
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axios = useAxios();

  // Initialize form with data if editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        questions: initialData.questions.length > 0 ? initialData.questions : [createEmptyQuestion()],
      });
    } else if (mode === "create") {
      // Suggest a title for new quiz
      setFormData({
        title: `Quiz for Chapter ${chapterNo}: ${chapterTitle}`,
        questions: [createEmptyQuestion()],
      });
    }
  }, [mode, initialData, chapterTitle, chapterNo]);

  // Create empty question template
  function createEmptyQuestion() {
    return {
      question: "",
      questionNo: 0,
      options: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    };
  }

  // Create quiz mutation
  const { mutate: createQuiz } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/quiz/create-quiz", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Quiz created successfully");
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create quiz");
      setIsSubmitting(false);
    },
  });

  // Update quiz mutation
  const { mutate: updateQuiz } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.put(`/quiz/update-quiz/${initialData._id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Quiz updated successfully");
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update quiz");
      setIsSubmitting(false);
    },
  });

  // Handle input change for quiz title
  const handleTitleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });

    // Clear validation error if field is now valid
    if (validationErrors.title && e.target.value.trim()) {
      const newErrors = { ...validationErrors };
      delete newErrors.title;
      setValidationErrors(newErrors);
    }
  };

  // Handle question change
  const handleQuestionChange = (index, updatedQuestion) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = updatedQuestion;

    setFormData({
      ...formData,
      questions: updatedQuestions,
    });

    // Clear validation errors for this question if it now has content
    if (validationErrors[`question-${index}`] && updatedQuestion.question.trim()) {
      const newErrors = { ...validationErrors };
      delete newErrors[`question-${index}`];
      setValidationErrors(newErrors);
    }
  };

  // Add new question
  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, createEmptyQuestion()],
    });
  };

  // Remove question
  const handleRemoveQuestion = (index) => {
    if (formData.questions.length <= 1) {
      toast.error("Quiz must have at least one question");
      return;
    }

    const updatedQuestions = formData.questions.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      questions: updatedQuestions,
    });

    // Clear validation error for this question
    if (validationErrors[`question-${index}`]) {
      const newErrors = { ...validationErrors };
      delete newErrors[`question-${index}`];
      setValidationErrors(newErrors);
    }
  };

  // Validate the form
  const validateForm = () => {
    const errors = {};

    // Validate quiz title
    if (!formData.title.trim()) {
      errors.title = "Quiz title is required";
    }

    // Validate each question
    formData.questions.forEach((question, index) => {
      if (!question.question.trim()) {
        errors[`question-${index}`] = "Question text is required";
      }

      // Check if options are filled
      const emptyOptions = question.options.filter((option) => !option.text.trim());
      if (emptyOptions.length > 0) {
        errors[`question-${index}-options`] = "All options must have text";
      }

      // Check if at least one option is marked as correct
      const hasCorrectOption = question.options.some((option) => option.isCorrect);
      if (!hasCorrectOption) {
        errors[`question-${index}-correct`] = "At least one option must be marked as correct";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    // Prepare data for submission
    const finalQuestions = formData.questions.map((q, index) => ({
      ...q,
      questionNo: index + 1,
    }));

    const quizData = {
      title: formData.title,
      chapterId: chapterId,
      questions: finalQuestions,
    };

    if (mode === "create") {
      createQuiz(quizData);
    } else {
      updateQuiz(quizData);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {mode === "create" ? "Create Quiz" : "Edit Quiz"} for Chapter {chapterNo}
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Quiz title */}
        <div className="mb-6">
          <label htmlFor="quizTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Quiz Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="quizTitle"
            value={formData.title}
            onChange={handleTitleChange}
            className={`w-full px-3 py-2 border ${
              validationErrors.title ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {validationErrors.title && <p className="mt-1 text-sm text-red-500">{validationErrors.title}</p>}
        </div>

        {/* Questions section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-800">
              Questions <span className="text-red-500">*</span>
            </h4>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-3 py-1 bg-primary hover:bg-primary/90 text-white rounded-md flex items-center text-sm"
            >
              <FaPlus className="mr-1" size={12} /> Add Question
            </button>
          </div>

          <div className="space-y-6">
            {formData.questions.map((question, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-5 border">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-medium text-gray-800">Question {index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(index)}
                    className="text-red-600 hover:text-red-800"
                    disabled={formData.questions.length <= 1}
                  >
                    <FaTrash />
                  </button>
                </div>

                <QuestionForm
                  question={question}
                  onChange={(updatedQuestion) => handleQuestionChange(index, updatedQuestion)}
                  errors={{
                    question: validationErrors[`question-${index}`],
                    options: validationErrors[`question-${index}-options`],
                    correct: validationErrors[`question-${index}-correct`],
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Form actions */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <CgSpinner className="animate-spin mr-2" />
                {mode === "create" ? "Creating..." : "Updating..."}
              </span>
            ) : mode === "create" ? (
              "Create Quiz"
            ) : (
              "Update Quiz"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
