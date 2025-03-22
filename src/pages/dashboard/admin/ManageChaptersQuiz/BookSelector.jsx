import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const BookSelector = ({ books, selectedBook, onSelectBook }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");

  // Filter books based on search and plan
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === "all" || book.plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  // Get plan badge style
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

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-4">Select a Book</h3>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Filter by plan */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Filter by plan:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedPlan("all")}
            className={`px-3 py-1 text-xs rounded-full ${
              selectedPlan === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedPlan("basic")}
            className={`px-3 py-1 text-xs rounded-full ${
              selectedPlan === "basic"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Basic
          </button>
          <button
            onClick={() => setSelectedPlan("standard")}
            className={`px-3 py-1 text-xs rounded-full ${
              selectedPlan === "standard"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setSelectedPlan("premium")}
            className={`px-3 py-1 text-xs rounded-full ${
              selectedPlan === "premium"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Premium
          </button>
        </div>
      </div>

      {/* Books list */}
      <div className="space-y-2 max-h-[calc(100vh-430px)] overflow-y-auto pr-1">
        {filteredBooks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No books found</p>
        ) : (
          filteredBooks.map((book) => (
            <button
              key={book._id}
              onClick={() => onSelectBook(book)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedBook?._id === book._id
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-14 mr-3 overflow-hidden rounded-md flex-shrink-0">
                  <img
                    src={book.thumbnail}
                    alt={book.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-medium text-gray-800 truncate">{book.name}</h4>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs capitalize px-2.5 py-1 rounded-full ${getPlanBadgeStyle(
                        book.plan
                      )}`}
                    >
                      {book.plan}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {book.chapters?.length || 0} chapters
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default BookSelector;