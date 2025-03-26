import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxios from "@/Hooks/useAxios";
import useAuth from "@/Hooks/useAuth";
import Loader from "@/components/shared/Loader";
import { FaSearch, FaBook, FaBookOpen, FaLock } from "react-icons/fa";

const StudentBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const axios = useAxios();
  const { user } = useAuth();

  // Fetch books for the student
  const { data: booksData, isLoading } = useQuery({
    queryKey: ["student-books"],
    queryFn: async () => {
      const res = await axios.get("/book/get-books");
      return res.data;
    },
  });

  // Fetch reading progress
  const { data: progressData } = useQuery({
    queryKey: ["reading-progress", user?._id],
    queryFn: async () => {
      // Fix: Add the missing API endpoint
      const res = await axios.get("/user/reading-progress");
      return res.data;
    },
    enabled: !!user,
  });

  const books = booksData?.data || [];
  const readingProgress = progressData?.data || [];

  // Filter books based on search term
  const filteredBooks = books.filter(
    (book) => book.name.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if user can access a book based on plan
  const canAccessBook = (bookPlan) => {
    if (!user?.subscription.plan) return false;

    const planRanks = { basic: 1, standard: 2, premium: 3 };
    const userPlanRank = planRanks[user.subscription.plan] || 0;
    const bookPlanRank = planRanks[bookPlan] || 0;

    return userPlanRank >= bookPlanRank;
  };

  // Get reading progress for a book
  const getBookProgress = (bookId) => {
    const progress = readingProgress.find((p) => p.bookId === bookId);
    if (!progress) return { completedChapters: [], percentage: 0 };

    // Return structured progress data
    return {
      completedChapters: progress.completedChapters || [],
      lastReadChapterId: progress.lastReadChapterId,
      percentage: progress.percentage || 0,
    };
  };

  // Handle book selection
  const handleSelectBook = (book) => {
    if (canAccessBook(book.plan)) {
      // Fix: Navigate to book reading page instead of book details
      // If the book has chapters, navigate to the first chapter or last read chapter
      if (book.chapters && book.chapters.length > 0) {
        const progress = getBookProgress(book._id);

        // If there's reading progress, go to the last chapter they were on
        if (progress.lastReadChapterId) {
          navigate(`/dashboard/book-reading/${book._id}/chapter/${progress.lastReadChapterId}`);
        } else {
          // Otherwise start with the first chapter
          navigate(`/dashboard/book-reading/${book._id}/chapter/${book.chapters[0]}`);
        }
      } else {
        // If book has no chapters, show a message or navigate to book details
        navigate(`/book-details/${book._id}`);
      }
    } else {
      // If user can't access, suggest upgrading
      navigate("/dashboard/plan");
    }
  };

  // Handle start/continue reading button click
  const handleReadingButtonClick = (e, book) => {
    e.stopPropagation(); // Prevent the entire card from also handling the click
    handleSelectBook(book);
  };

  // Plan badge styling
  const getPlanBadgeStyle = (plan) => {
    switch (plan) {
      case "basic":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "standard":
        return "bg-green-100 text-green-800 border border-green-200";
      case "premium":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  if (isLoading) {
    return <Loader text="Loading books..." />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Books</h1>

      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Books grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            const progress = getBookProgress(book._id);
            const canAccess = canAccessBook(book.plan);
            const progressPercentage = Math.round(progress.percentage * 100) || 0;

            return (
              <div
                key={book._id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden border transition-transform duration-300 hover:shadow-md flex flex-col justify-between ${
                  canAccess ? "hover:scale-[1.02] cursor-pointer" : "opacity-80"
                }`}
                onClick={() => canAccess && handleSelectBook(book)}
              >
                <div className="relative">
                  <img src={book.thumbnail} alt={book.name} className="w-full h-48 object-cover object-center" />

                  {/* Plan badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`capitalize text-xs font-semibold px-2.5 py-1 rounded-full ${getPlanBadgeStyle(book.plan)}`}>{book.plan}</span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-1">{book.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">by {book.author}</p>
                  </div>

                  {/* Lock overlay if not accessible */}
                  {!canAccess && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center flex-col">
                      <FaLock className="text-white text-4xl mb-2" />
                      <p className="text-white font-medium">Upgrade Required</p>
                      <p className="text-white/80 text-sm">This book requires {book.plan} plan</p>
                    </div>
                  )}
                </div>

                <div className="px-4 pb-4">
                  {/* Chapter count */}
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-600 flex items-center">
                      <FaBookOpen className="mr-1" />
                      {book.chapters?.length || 0} chapters
                    </span>

                    {canAccess && progress.completedChapters?.length > 0 && (
                      <span className="text-green-600">
                        {progress.completedChapters.length}/{book.chapters?.length || 0} completed
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  {canAccess && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                  )}

                  {/* Continue reading or Start reading button */}
                  {canAccess && (
                    <button
                      onClick={(e) => handleReadingButtonClick(e, book)}
                      className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      {progressPercentage > 0 ? "Continue Reading" : "Start Reading"}
                    </button>
                  )}

                  {!canAccess && (
                    <button
                      onClick={() => navigate("/dashboard/plan")}
                      className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Upgrade to Access
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <FaBook className="text-gray-300 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No books found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentBooks;
