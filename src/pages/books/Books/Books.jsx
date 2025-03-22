import Loader from "@/components/shared/Loader";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import BooksCard from "./BooksCard";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const axios = useAxios();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get("/book/get-books");
      console.log(res.data);
      return res.data.data;
    },
  });

  // Filter books based on search term and selected plan
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      book?.author?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      book?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());

    const matchesPlan = selectedPlan === "all" || book?.plan === selectedPlan;

    return matchesSearch && matchesPlan;
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50 min-h-screen mt-[3.5rem] lg:mt-[4rem]">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#00776d] via-[#00776d] to-[#00776d] text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=1974')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Robotics Learning Library</h1>
            <p className="text-xl text-blue-100 mb-8">
              Explore our comprehensive collection of robotics books and tutorials to master the art and science of building intelligent machines.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm flex items-center gap-2">
                <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                <span>Self-paced learning</span>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm flex items-center gap-2">
                <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                <span>Expert-curated content</span>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm flex items-center gap-2">
                <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                <span>Hands-on projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-1/2">
              <input
                type="text"
                placeholder="Search books by title, author or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full lg:w-auto">
              <FaFilter className="text-gray-500" />
              <span className="text-gray-600 font-medium">Filter by:</span>
              <div className="flex flex-wrap md:flex-nowrap gap-2">
                <button
                  onClick={() => setSelectedPlan("all")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPlan === "all"
                      ? "bg-gray-100 text-gray-800 border border-gray-300"
                      : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  All Plans
                </button>
                <button
                  onClick={() => setSelectedPlan("basic")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPlan === "basic"
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Basic
                </button>
                <button
                  onClick={() => setSelectedPlan("standard")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPlan === "standard"
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setSelectedPlan("premium")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPlan === "premium"
                      ? "bg-purple-100 text-purple-800 border border-purple-300"
                      : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Premium
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Books Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {filteredBooks.length > 0 ? `Showing ${filteredBooks.length} ${filteredBooks.length === 1 ? "book" : "books"}` : "No books found"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BooksCard key={book._id} book={book} />
            ))}
          </div>
        </div>
        {/* Empty state */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No books found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
        {/* Pagination */}
        <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredBooks.length}</span> of <span className="font-medium">{books.length}</span> books
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled
            >
              Previous
            </button>
            <span className="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700">1</span>
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
