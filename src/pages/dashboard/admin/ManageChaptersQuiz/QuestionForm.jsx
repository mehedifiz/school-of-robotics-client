const QuestionForm = ({ question, onChange, errors }) => {
  // Handle question text change
  const handleQuestionTextChange = (e) => {
    onChange({
      ...question,
      question: e.target.value,
    });
  };

  // Handle option text change
  const handleOptionTextChange = (index, text) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = { ...updatedOptions[index], text };

    onChange({
      ...question,
      options: updatedOptions,
    });
  };

  // Handle correct option change
  const handleCorrectOptionChange = (index) => {
    const updatedOptions = question.options.map((option, i) => ({
      ...option,
      isCorrect: i === index, // Only the selected option is correct
    }));

    onChange({
      ...question,
      options: updatedOptions,
    });
  };

  return (
    <div>
      {/* Question text */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question Text <span className="text-red-500">*</span>
        </label>
        <textarea
          value={question.question}
          onChange={handleQuestionTextChange}
          placeholder="Enter your question here..."
          rows={2}
          className={`w-full px-3 py-2 border ${
            errors?.question ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
        />
        {errors?.question && <p className="mt-1 text-sm text-red-500">{errors.question}</p>}
      </div>

      {/* Options */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Options <span className="text-red-500">*</span>
          <span className="text-sm font-normal text-gray-500 ml-2">(Select one as the correct answer)</span>
        </label>

        {errors?.options && <p className="mb-2 text-sm text-red-500">{errors.options}</p>}

        {errors?.correct && <p className="mb-2 text-sm text-red-500">{errors.correct}</p>}

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-start">
              <div className="flex items-center mt-1 mr-3">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name={`correct-option-${question.questionNo || "new"}`}
                  checked={option.isCorrect}
                  onChange={() => handleCorrectOptionChange(index)}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs mr-2">{String.fromCharCode(65 + index)}</span>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionTextChange(index, e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
