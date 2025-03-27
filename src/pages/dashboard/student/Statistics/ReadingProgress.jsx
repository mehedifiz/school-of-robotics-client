import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaBookOpen, FaChevronRight, FaRegClock, FaStar } from "react-icons/fa";
import { BookOpen, Clock, Award, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReadingProgress = ({ readingProgress }) => {
  const navigate = useNavigate();
  const [expandedBook, setExpandedBook] = useState(null);

  // Sort books by reading percentage (descending)
  const sortedBooks = readingProgress ? [...readingProgress].sort((a, b) => b.percentage - a.percentage) : [];

  const toggleExpand = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };

  const goToBook = (bookId, lastReadChapterId) => {
    navigate(`/dashboard/book-reading/${bookId}/chapter/${lastReadChapterId}`);
  };
  // Stats summary
  const completedBooks = sortedBooks.filter((book) => book.percentage === 1).length;
  const inProgressBooks = sortedBooks.filter((book) => book.percentage > 0 && book.percentage < 1).length;
  const notStartedBooks = sortedBooks.filter((book) => book.percentage === 0).length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants} className="space-y-6">
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-50 p-6">
        <h2 className="text-xl font-semibold mb-4">Reading Progress</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/40 rounded-xl p-4">
            <BookOpen className="h-6 w-6 text-emerald-600 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{completedBooks}</h3>
            <p className="text-sm text-emerald-700">Completed</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100/40 rounded-xl p-4">
            <Clock className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{inProgressBooks}</h3>
            <p className="text-sm text-blue-700">In Progress</p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100/40 rounded-xl p-4">
            <Award className="h-6 w-6 text-gray-500 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{notStartedBooks}</h3>
            <p className="text-sm text-gray-500">Not Started</p>
          </div>
        </div>

        {sortedBooks.length === 0 && (
          <div className="text-center py-12">
            <FaBookOpen className="text-gray-300 text-5xl mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No reading progress yet</p>
            <p className="text-sm text-gray-400 mt-1">Start reading books to track your progress</p>
            <button
              onClick={() => navigate("/dashboard/student-book")}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Browse Books
            </button>
          </div>
        )}
      </motion.div>

      {sortedBooks.length > 0 && (
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-50 p-6">
          <h3 className="text-lg font-semibold mb-4">Your Books</h3>
          <div className="space-y-3">
            {sortedBooks.map((book, index) => {
              return (
                <motion.div
                  key={book.bookId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <BookProgressCard
                    book={book}
                    isExpanded={expandedBook === book.bookId}
                    toggleExpand={() => toggleExpand(book.bookId)}
                    goToBook={() => goToBook(book.bookId, book.lastReadChapterId)}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const BookProgressCard = ({ book, isExpanded, toggleExpand, goToBook }) => {
  const percentage = Math.round(book.percentage * 100);
  const formattedDate = new Date(book.lastReadAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Animation variants
  const expandVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.25, delay: 0.1 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.15 },
      },
    },
  };

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/60">
      <div className="flex items-center p-3 cursor-pointer" onClick={toggleExpand}>
        <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0 border border-gray-200">
          <img
            src={book.thumbnail}
            alt={book.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/48?text=Book";
            }}
          />
        </div>

        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-gray-800 truncate">{book.name}</h3>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span className={`px-1.5 py-0.5 rounded ${book.plan === "premium" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"} mr-2`}>
              {book.plan}
            </span>
            <Clock className="w-3 h-3 mr-1" />
            <span>Last read: {formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center ml-4">
          <div className="text-right mr-3">
            <div className="flex items-center">
              {percentage >= 100 ? <Award className="w-4 h-4 text-amber-500 mr-1" /> : <></>}
              <span className={`text-sm font-medium ${percentage >= 100 ? "text-amber-500" : percentage > 0 ? "text-primary" : "text-gray-400"}`}>
                {percentage}%
              </span>
            </div>
          </div>
          <ChevronRight className={`text-gray-400 transform transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div className="overflow-hidden" variants={expandVariants} initial="hidden" animate="visible" exit="exit">
            <div className="p-3 border-t border-gray-200/60">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs font-medium">{book.completedChapters?.length || 0} completed chapters</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                <div className={`h-1.5 rounded-full ${percentage >= 100 ? "bg-amber-500" : "bg-primary"}`} style={{ width: `${percentage}%` }}></div>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                {book.lastReadChapterTitle && (
                  <div className="mb-2">
                    <span className="font-medium">Last read chapter:</span> {book.lastReadChapterTitle}
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToBook();
                }}
                className="w-full py-2 px-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-sm font-medium transition-colors flex items-center justify-center"
              >
                <BookOpen className="w-4 h-4 mr-2" /> Continue Reading
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReadingProgress;
