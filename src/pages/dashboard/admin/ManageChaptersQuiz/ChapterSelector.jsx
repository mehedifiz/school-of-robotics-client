import { FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import Loader from "@/components/shared/Loader";

const ChapterSelector = ({ chapters, selectedChapter, onSelectChapter, isLoading }) => {
  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-4">Select a Chapter</h3>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader size="small" showText={false} />
        </div>
      ) : chapters.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          <p>No chapters available for this book</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[calc(100vh-430px)] overflow-y-auto pr-1">
          {chapters.map((chapter) => (
            <button
              key={chapter._id}
              onClick={() => onSelectChapter(chapter)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedChapter?._id === chapter._id
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-800 font-semibold">{chapter.chapterNo}</span>
                    </div>
                    <h4 className="font-medium text-gray-800">{chapter.title}</h4>
                  </div>
                </div>
                
                {/* Quiz indicator */}
                <div>
                  {chapter.quizId ? (
                    <span className="inline-flex items-center text-green-600">
                      <FaCheckCircle className="mr-1" />
                      <span className="text-xs">Has Quiz</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-gray-400">
                      <FaQuestionCircle className="mr-1" />
                      <span className="text-xs">No Quiz</span>
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChapterSelector;