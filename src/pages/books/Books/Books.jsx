import { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Book, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BooksCard from "./BooksCard";
import SectionHeader from "@/components/utility/SectionHeader";
import AOS from "aos";
import "aos/dist/aos.css";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const axios = useAxios();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get("/book/getAllBooksFree");
      return res.data.books;
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
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen mt-[3.5rem] lg:mt-[4rem]">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Hero Banner */}
      <div className="relative bg-primary text-white overflow-hidden px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#ffffff_0%,rgba(255,255,255,0)_25%)]"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=1974')] bg-cover bg-center mix-blend-overlay opacity-60"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto py-20 relative z-10">
          <div className="max-w-3xl" data-aos="fade-up">
            <div className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4 backdrop-blur-sm">Expand Your Knowledge</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 relative">
              <span className="relative z-10">Robotics Learning Library</span>
              <span className="absolute -bottom-3 left-0 h-1 w-16 bg-white/40 rounded-full"></span>
            </h1>
            <p className="text-xl text-blue-50 mb-8">
              Explore our comprehensive collection of robotics books and tutorials to master the art and science of building intelligent machines.
            </p>
            <div className="flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="100">
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

      <div className="px-6 lg:px-8">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-12 relative z-10">
          {/* Search and Filter Section */}
          <div className="glass-card p-6 mb-12 transition-all duration-300 hover:shadow-xl" data-aos="fade-up">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="relative w-full lg:w-1/2">
                <input
                  type="text"
                  placeholder="Search books by title, author or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full lg:w-auto">
                <Filter className="text-primary" size={18} />
                <span className="text-gray-700 font-medium">Filter by:</span>
                <div className="flex flex-wrap md:flex-nowrap gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedPlan("all")}
                    className={cn(
                      "rounded-md font-medium transition-colors",
                      selectedPlan === "all" ? "bg-gray-100 text-gray-800" : "text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    All Plans
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedPlan("basic")}
                    className={cn(
                      "rounded-md font-medium transition-colors",
                      selectedPlan === "basic" ? "bg-blue-100 text-blue-800" : "text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    Basic
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedPlan("standard")}
                    className={cn(
                      "rounded-md font-medium transition-colors",
                      selectedPlan === "standard" ? "bg-green-100 text-green-800" : "text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    Standard
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedPlan("premium")}
                    className={cn(
                      "rounded-md font-medium transition-colors",
                      selectedPlan === "premium" ? "bg-purple-100 text-purple-800" : "text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    Premium
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="mb-8 flex items-center justify-between" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredBooks.length > 0 ? (
                <div className="flex items-center gap-2">
                  <Book className="text-primary" size={24} />
                  <span>
                    Showing {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
                  </span>
                </div>
              ) : (
                "No books found"
              )}
            </h2>
            <div className="text-sm text-gray-500">
              {filteredBooks.length} of {books.length} results
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book, index) => (
              <div key={book._id} data-aos="fade-up" data-aos-delay={(index % 4) * 100}>
                <BooksCard book={book} />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredBooks.length === 0 && (
            <div className="glass-card p-12 text-center" data-aos="fade-up">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="mt-6 text-xl font-medium text-gray-900">No books found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              <Button
                variant="outline"
                className="mt-6 border-primary text-primary hover:bg-primary-50"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedPlan("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredBooks.length > 0 && (
            <div className="mt-12 flex justify-center" data-aos="fade-up">
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="border-gray-200 text-gray-700" disabled>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" className="border-primary bg-primary text-white hover:bg-primary-600 hover:text-white">
                  1
                </Button>
                <Button variant="outline" className="border-gray-200 text-gray-700" disabled>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
