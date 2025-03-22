import Loader from "@/components/shared/Loader";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaBook, FaPlus } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import AddChapterModal from "./AddChapterModal";
import BookSelector from "./BookSelector";
import ChaptersList from "./ChaptersList";

const ManageChapters = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const axios = useAxios();
  const { state } = useLocation();

  // Fetch books
  const {
    data: books = [],
    isLoading: booksLoading,
    refetch: refetchBooks,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get("/book/get-books");
      return res.data.data;
    },
  });

  // Fetch chapters for selected book
  const {
    data: chaptersData,
    isLoading: chaptersLoading,
    refetch: refetchChapters,
  } = useQuery({
    queryKey: ["chapters", selectedBook?._id],
    queryFn: async () => {
      if (!selectedBook) return { data: [] };
      const res = await axios.get(`/book/get-chapter/${selectedBook._id}`);
      return res.data;
    },
    enabled: !!selectedBook,
  });

  const chapters = chaptersData?.data || [];

  // Handle book selection
  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  // Set selected book from location state
  useEffect(() => {
    if (state?.book) {
      setSelectedBook(state.book);
    }
  }, [state]);

  if (booksLoading) {
    return <Loader size="default" text="Loading books..." />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Chapters</h1>

      <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
        {/* Left side - Book selection */}
        <div className="xl:col-span-2 bg-white h-fit p-5 rounded-xl shadow-sm">
          <BookSelector books={books} selectedBook={selectedBook} onSelectBook={handleBookSelect} />
        </div>

        {/* Right side - Chapters management */}
        <div className="xl:col-span-4 bg-white p-5 rounded-xl shadow-sm">
          {!selectedBook ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FaBook className="text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">Select a Book</h3>
              <p className="text-gray-500 mt-2">Choose a book from the list to manage its chapters</p>
            </div>
          ) : (
            <div>
              <div className="flex flex-col sm:flex-row gap-y-4 justify-between sm:items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Chapters for: <span className="text-primary">{selectedBook.name}</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {chapters.length} {chapters.length === 1 ? "chapter" : "chapters"} available
                  </p>
                </div>

                <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center">
                  <FaPlus className="mr-2" /> Add Chapter
                </button>
              </div>

              {chaptersLoading ? (
                <div className="py-20">
                  <Loader size="small" showText={false} />
                </div>
              ) : chapters.length > 0 ? (
                <ChaptersList chapters={chapters} bookId={selectedBook._id} refetchChapters={refetchChapters} refetchBooks={refetchBooks} />
              ) : (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
                  <FiAlertCircle className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800">No chapters yet</h4>
                    <p className="text-blue-600 mt-1">This book doesn't have any chapters. Click "Add Chapter" to create the first one.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Chapter Modal */}
      {isAddModalOpen && selectedBook && (
        <AddChapterModal
          book={selectedBook}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            refetchChapters();
            setIsAddModalOpen(false);
          }}
          refetchBooks={refetchBooks}
        />
      )}
    </div>
  );
};

export default ManageChapters;
