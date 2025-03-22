import Loader from "@/components/shared/Loader";
import { useState } from "react";
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaList, FaQuestionCircle, FaSearch } from "react-icons/fa";

const ChapterSelector = ({ chapters, selectedChapter, onSelectChapter, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  // Filter chapters based on search
  const filteredChapters = chapters.filter((chapter) => {
    const searchString = searchTerm.toLowerCase();
    return chapter.title.toLowerCase().includes(searchString) || chapter.chapterNo.toString().includes(searchString);
  });

  // Toggle chapter list expansion
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  console.log(filteredChapters);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Select a Chapter</h3>

        {/* Collapse/Expand button */}
        <button
          onClick={toggleExpansion}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label={isExpanded ? "Collapse chapter list" : "Expand chapter list"}
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {/* Collapsible section */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[calc(100vh-280px)]" : "max-h-0"}`}>
        {!isLoading && chapters.length > 0 && (
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search chapters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader size="small" showText={false} />
          </div>
        ) : chapters.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <p>No chapters available for this book</p>
          </div>
        ) : filteredChapters.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <p>No chapters match your search</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[calc(100vh-470px)] overflow-y-auto pr-1">
            {filteredChapters.map((chapter) => (
              <button
                key={chapter._id}
                onClick={() => {
                  onSelectChapter(chapter);
                  setIsExpanded(false);
                }}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedChapter?._id === chapter._id ? "bg-primary/10 border border-primary/20" : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
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

      {/* Collapsed state indicator - when a chapter is selected */}
      {!isExpanded && selectedChapter && (
        <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
              <span className="text-blue-800 font-semibold">{selectedChapter.chapterNo}</span>
            </div>
            <div>
              <p className="font-medium text-sm">
                Selected: <span className="text-primary">{selectedChapter.title}</span>
              </p>
              <p className="text-xs text-gray-500">Click the arrow above to change selection</p>
            </div>
            <div className="ml-auto">
              {selectedChapter.quizId ? (
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
        </div>
      )}

      {/* Empty state when collapsed and no chapter selected */}
      {!isExpanded && !selectedChapter && !isLoading && chapters.length > 0 && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <FaList className="mx-auto text-gray-400 mb-1" />
          <p className="text-sm text-gray-500">No chapter selected</p>
          <button onClick={toggleExpansion} className="text-xs text-primary hover:text-primary/80 mt-1">
            Click to expand and select a chapter
          </button>
        </div>
      )}
    </div>
  );
};

export default ChapterSelector;
