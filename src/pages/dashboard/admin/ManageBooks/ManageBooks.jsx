import Loader from "@/components/shared/Loader";
import useAxios from "@/Hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaEdit, FaEye, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import AddBookModal from "./AddBookModal";

const ManageBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingBookId, setDeletingBookId] = useState(null);
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get("/book/get-books");
      console.log(res.data);
      return res.data.data;
    },
  });

  // Create a delete mutation
  const { mutate: deleteBook, isPending: isDeleting } = useMutation({
    mutationFn: async (bookId) => {
      const response = await axios.delete(`/book/${bookId}`);
      return response.data;
    },
    onSuccess: (data) => {
      // Close any open loading alerts
      Swal.close();

      // Show success alert
      Swal.fire({
        title: "Deleted!",
        text: "The book has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#10B981", // Your primary color
        timer: 2000,
        timerProgressBar: true,
      });

      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      // Close any open loading alerts
      Swal.close();

      // Show error alert
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete book",
        icon: "error",
        confirmButtonColor: "#10B981", // Your primary color
      });

      console.error("Error deleting book:", error);
    },
    onSettled: () => {
      setDeletingBookId(null);
    },
  });

  // Handle book deletion
  const handleDeleteBook = (id, bookName) => {
    Swal.fire({
      title: "Are you sure?",
      html: `<p>You are about to delete <strong>${bookName}</strong>.</p><p class="text-sm text-gray-500 mt-2">This action cannot be undone!</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981", // Your primary color
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      iconColor: "#F87171",
      customClass: {
        confirmButton: "px-4 py-2 text-sm font-medium",
        cancelButton: "px-4 py-2 text-sm font-medium",
        title: "text-xl text-gray-800",
        popup: "rounded-lg shadow-lg",
      },
      buttonsStyling: true,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletingBookId(id);
        deleteBook(id);

        // Show a loading state while deleting
        Swal.fire({
          title: "Deleting...",
          html: "Please wait while we remove this book.",
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });
      }
    });
  };

  // Filter books based on search term and filter
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) || book?.author?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesPlan = selectedPlan === "all" || book.plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // modal functions
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  if (isLoading || isDeleting) {
    return <Loader />;
  }
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-medium text-2xl">Books</h1>

        <button onClick={handleOpenModal} className="flex items-center gap-2 bg-primary text-white text-sm px-4 py-2 rounded-md">
          <FaPlus />
          <span>New book</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-2">
              {["All", "Basic", "Standard", "premium"].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan.toLowerCase())}
                  className={`px-3 py-1.5 rounded-md text-sm ${selectedPlan === plan.toLowerCase() ? "bg-[#EDF1F4] font-medium" : "text-gray-700"}`}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chapters
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Added
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBooks.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-sm object-cover" src={book.thumbnail} alt={book.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{book.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">{book.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{book.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      book.plan === "basic"
                        ? "bg-blue-100 text-blue-800"
                        : book.plan === "standard"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {book.plan}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.chapters.length}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(book.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-500 hover:text-indigo-600">
                      <FaEye />
                    </button>
                    <button className="text-gray-500 hover:text-blue-600">
                      <FaEdit />
                    </button>
                    <button
                      className={`text-gray-500 hover:text-red-600 ${deletingBookId === book._id ? "opacity-50" : ""}`}
                      onClick={() => handleDeleteBook(book._id, book.name)}
                      disabled={isDeleting && deletingBookId === book._id}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      {/* Modal */}
      {isModalOpen && (
        <AddBookModal
          props={{
            setIsModalOpen,
          }}
        ></AddBookModal>
      )}
    </div>
  );
};

export default ManageBooks;
