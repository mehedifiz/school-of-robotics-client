import Loader from "@/components/shared/Loader";
import useAuth from "@/Hooks/useAuth";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft, FaBookOpen, FaChevronDown, FaChevronUp, FaClock, FaLock } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeChapter, setActiveChapter] = useState(null);

  // Get book details
  const { data: bookData, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axios.get(`/book/getBookFree/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  const book = bookData?.data || {};

  // Get related books
  const { data: relatedBooks = [] } = useQuery({
    queryKey: ["related-books", book?.plan],
    queryFn: async () => {
      if (book?.plan) {
        const res = await axios.get(`/book/get-books?plan=${book.plan}&limit=3`);
        return res.data.data.filter((relatedBook) => relatedBook._id !== id);
      }
      return [];
    },
    enabled: !!book?.plan,
  });

  // Check if user has access to this book
  const userCanAccess = () => {
    if (!user) return false;

    if (user.role === "admin") return true;

    // This would need to be updated based on your actual subscription logic
    const planLevels = { basic: 1, standard: 2, premium: 3 };
    const bookPlanLevel = planLevels[book.plan] || 0;
    const userPlanLevel = planLevels[user.subscription.plan] || 0;

    return userPlanLevel >= bookPlanLevel;
  };

  // Toggle chapter expansion
  const toggleChapter = (index) => {
    setActiveChapter(activeChapter === index ? null : index);
  };

  // Handle start reading
  const handleStartReading = () => {
    if (!user) {
      toast.error("Please login to start reading");
      navigate("/login");
      return;
    }

    if (!userCanAccess()) {
      toast.error(`You need a ${book.plan} plan to access this book`);
      navigate("/dashboard/plan");
      return;
    }

    // Navigate to first chapter or reading view
    if (book.chapters && book.chapters.length > 0) {
      navigate(`/dashboard/book-reading/${book._id}/chapter/${book.chapters[0]}`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  // Plan badge style
  const planBadgeStyle = {
    basic: "bg-blue-100 text-blue-800 border border-blue-200",
    standard: "bg-green-100 text-green-800 border border-green-200",
    premium: "bg-purple-100 text-purple-800 border border-purple-200",
  };

  // Format last updated date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-8 mt-[3.5rem] lg:mt-[4rem]">
      <div className="container mx-auto px-4 pb-[4rem]">
        {/* Back navigation */}
        <div className="mb-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
            <FaArrowLeft className="mr-2" />
            <span>Back</span>
          </button>
        </div>

        {
          /* Book not found */
          !book._id ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FaBookOpen className="text-4xl text-gray-400" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">Book Not Found</h2>
              <p className="text-gray-600 max-w-md mb-8">
                The book you're looking for doesn't exist or might have been removed. Please check the URL or explore our other learning resources.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/books" className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors flex items-center">
                  <FaBookOpen className="mr-2" />
                  Browse Books
                </Link>

                <Link
                  to="/dashboard"
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors border border-gray-200"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Book header section */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-r from-[#00776d] via-[#00776d] to-[#00776d]">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=1974')] bg-cover bg-center"></div>
                </div>

                <div className="relative px-6 pb-6 -mt-32">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Book image */}
                    <div className="md:w-1/4 lg:w-1/5">
                      <img src={book.thumbnail} alt={book.name} className="w-full aspect-[3/4] object-cover rounded-lg shadow-xl border-4 border-white" />
                    </div>

                    {/* Book details */}
                    <div className="md:w-3/4 lg:w-4/5 mt-6 md:mt-32">
                      <div className="flex flex-wrap gap-3 my-3">
                        <span className={`capitalize text-xs font-semibold px-2.5 py-1 rounded-full ${planBadgeStyle[book.plan]}`}>{book.plan} Plan</span>

                        <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200">
                          <FaBookOpen className="inline mr-1" />
                          {book.chapters?.length || 0} Chapters
                        </span>
                      </div>

                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{book.name}</h1>

                      <p className="text-lg text-gray-600 mb-4">
                        By <span className="font-medium text-gray-900">{book.author}</span>
                      </p>

                      <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <FaClock className="mr-2" />
                          <span>Updated {formatDate(book.updatedAt)}</span>
                        </div>

                        <div className="flex items-center">
                          <HiOutlineAcademicCap size={18} className="mr-2" />
                          <span>School of Robotics Curriculum</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-6">
                        <button
                          onClick={handleStartReading}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Start Reading
                        </button>

                        {!userCanAccess() && (
                          <Link
                            to="/dashboard/plan"
                            className="px-6 py-3 bg-purple-100 text-purple-800 hover:bg-purple-200 font-medium rounded-lg transition-colors border border-purple-200"
                          >
                            Upgrade Plan
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book content details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2">
                  {/* About this book */}
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About this book</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{book.description}</p>
                    </div>
                  </div>

                  {/* Chapters */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Contents</h2>

                    <div className="divide-y divide-gray-200">
                      {book.chapters && book.chapters.length > 0 ? (
                        book.chapters.map((chapter, index) => (
                          <div key={chapter} className="py-4">
                            <button className="flex w-full justify-between items-center focus:outline-none" onClick={() => toggleChapter(index)}>
                              <div className="flex items-center">
                                <div className="bg-blue-50 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-semibold">
                                  {index + 1}
                                </div>
                                <div className="text-left">
                                  <h3 className="font-medium text-gray-900">Chapter {index + 1}</h3>
                                  <p className="text-sm text-gray-500">
                                    {userCanAccess() ? (
                                      "Available to read"
                                    ) : (
                                      <span className="flex items-center">
                                        <FaLock className="mr-1" /> Requires {book.plan} plan
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>

                              {activeChapter === index ? <FaChevronUp /> : <FaChevronDown />}
                            </button>

                            {activeChapter === index && (
                              <div className="mt-3 pl-11">
                                <p className="text-gray-600 mb-3">This chapter covers foundational concepts and practical applications.</p>

                                {userCanAccess() ? (
                                  <Link
                                    to={`/dashboard/book-reading/${book._id}/chapter/${chapter}`}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                  >
                                    Start reading <FaArrowLeft className="ml-2 transform rotate-180" />
                                  </Link>
                                ) : (
                                  <div className="text-amber-600">
                                    <Link to="/dashboard/plan" className="underline">
                                      Upgrade your plan
                                    </Link>{" "}
                                    to access this content
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 py-4">No chapters available for this book yet.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  {/* Access information */}
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Access Information</h3>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className={`rounded-full p-2 ${planBadgeStyle[book.plan]} mr-4`}>
                          <FaLock className="text-lg" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Required Plan</p>
                          <p className="text-gray-600">This book requires a {book.plan} plan or higher</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="rounded-full p-2 bg-blue-100 text-blue-800 mr-4">
                          <FaBookOpen className="text-lg" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Reading Access</p>
                          <p className="text-gray-600">{userCanAccess() ? "You have full access to this book" : "Upgrade your plan to read this book"}</p>
                        </div>
                      </div>
                    </div>

                    {!userCanAccess() && (
                      <div className="mt-6">
                        <Link
                          to="/dashboard/plan"
                          className="w-full block text-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Upgrade Now
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Related books */}
                  {relatedBooks.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Related Books</h3>

                      <div className="space-y-4">
                        {relatedBooks.slice(0, 3).map((relatedBook) => (
                          <Link key={relatedBook._id} to={`/book-details/${relatedBook._id}`} className="flex group">
                            <img src={relatedBook.thumbnail} alt={relatedBook.name} className="w-16 h-20 object-cover rounded-md" />
                            <div className="ml-3">
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{relatedBook.name}</h4>
                              <p className="text-sm text-gray-500">{relatedBook.author}</p>
                              <div className="mt-1">
                                <span className={`capitalize text-xs font-semibold px-2 py-0.5 rounded-full ${planBadgeStyle[relatedBook.plan]}`}>
                                  {relatedBook.plan}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/books" className="text-primary hover:text-[#025c54] text-sm font-medium">
                          View all books
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

export default BookDetails;
