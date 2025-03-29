import useAxios from "@/Hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaFileAlt, FaTrash, FaTimes } from "react-icons/fa";
import { PiSealQuestionBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EditChapterModal from "./EditChapterModal";
import PDFViewer from "@/components/utility/PDFViewer";
import { AnimatePresence, motion } from "framer-motion";

const ChaptersList = ({ chapters, book, refetchChapters, refetchBooks, selectedBook }) => {
  const [editingChapter, setEditingChapter] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
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

  // Handle opening PDF modal
  const handleViewPdf = (chapter) => {
    setSelectedPdf({
      url: chapter.pdfUrl,
      title: `Chapter ${chapter.chapterNo}: ${chapter.title}`,
    });
    setIsPdfModalOpen(true);
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
                  <button
                    onClick={() => handleViewPdf(chapter)}
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 hover:underline"
                  >
                    <FaFileAlt className="mr-1" /> View PDF
                  </button>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(chapter.createdAt)}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleQuizNavigation(chapter)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 mr-2"
                    title="Manage Quizzes"
                  >
                    <PiSealQuestionBold size={16} />
                  </button>

                  <button
                    onClick={() => handleEditChapter(chapter)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 mr-2"
                    title="Edit Chapter"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteChapter(chapter)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                    disabled={isDeleting}
                    title="Delete Chapter"
                  >
                    <FaTrash size={14} />
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

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {isPdfModalOpen && selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/50 flex items-center justify-center p-4"
            onClick={() => setIsPdfModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">{selectedPdf.title}</h2>
                <button onClick={() => setIsPdfModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                  <FaTimes />
                </button>
              </div>
              <div className="p-4">
                <PDFViewer pdfUrl={selectedPdf.url} />
              </div>
              <div className="bg-gray-50 py-3 px-4 text-right">
                <button onClick={() => setIsPdfModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChaptersList;
