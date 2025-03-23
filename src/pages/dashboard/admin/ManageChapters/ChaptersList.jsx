import useAxios from "@/Hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaFileAlt, FaTrash } from "react-icons/fa";
import { PiSealQuestionBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EditChapterModal from "./EditChapterModal";

const ChaptersList = ({ chapters, book, refetchChapters, refetchBooks, selectedBook }) => {
  const [editingChapter, setEditingChapter] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const axios = useAxios();
  const navigate = useNavigate();

  // Delete chapter mutation
  const { mutate: deleteChapter, isPending: isDeleting } = useMutation({
    mutationFn: async (chapterId) => {
      const response = await axios.delete(`/book/delete-chapter/${chapterId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Chapter deleted successfully");
      refetchChapters();
      refetchBooks();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete chapter");
    },
  });

  // Handle chapter deletion
  const handleDeleteChapter = (chapter) => {
    Swal.fire({
      title: "Are you sure?",
      html: `<p>You are about to delete <strong>Chapter ${chapter.chapterNo}: ${chapter.title}</strong>.</p>
             <p class="text-sm text-gray-500 mt-2">This action cannot be undone!</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00776d",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteChapter(chapter._id);
      }
    });
  };

  // Handle edit chapter
  const handleEditChapter = (chapter) => {
    setEditingChapter(chapter);
    setIsEditModalOpen(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // handle chapter quiz navigation
  const handleQuizNavigation = (chapter) => {
    navigate("/dashboard/manage-chapter-quizzes", { state: { book: selectedBook, chapter } });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chapter</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PDF</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chapters.map((chapter) => (
              <tr key={chapter._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-xl font-bold text-primary">{chapter.chapterNo}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">{chapter.title}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <a
                    href={chapter.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80"
                  >
                    <FaFileAlt className="mr-1" /> View PDF
                  </a>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(chapter.createdAt)}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleQuizNavigation(chapter)} className="text-purple-600 hover:text-purple-900 mr-3">
                    <PiSealQuestionBold />
                  </button>

                  <button onClick={() => handleEditChapter(chapter)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteChapter(chapter)} className="text-red-600 hover:text-red-900" disabled={isDeleting}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Chapter Modal */}
      {isEditModalOpen && editingChapter && (
        <EditChapterModal
          chapter={editingChapter}
          bookId={book?._id}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            refetchChapters();
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ChaptersList;
