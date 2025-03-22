import useAxios from "@/Hooks/useAxios";
import uploadPdf from "@/utils/uploadPdf";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { FaTimes, FaUpload } from "react-icons/fa";

const EditChapterModal = ({ chapter, bookId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    chapterNo: "",
    pdfUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // Add this state for drag and drop
  const fileInputRef = useRef(null);
  const axios = useAxios();

  // Initialize form data with chapter details
  useEffect(() => {
    if (chapter) {
      setFormData({
        title: chapter.title || "",
        chapterNo: chapter.chapterNo || "",
        pdfUrl: chapter.pdfUrl || "",
      });
    }
  }, [chapter]);

  // Update chapter mutation
  const { mutate: updateChapter } = useMutation({
    mutationFn: async (chapterData) => {
      const response = await axios.patch(`/book/update-chapter/${chapter._id}`, chapterData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Chapter updated successfully");
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update chapter");
      setIsSubmitting(false);
    },
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle PDF file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      // Clear any PDF URL error
      if (errors.pdfUrl) {
        setErrors({
          ...errors,
          pdfUrl: "",
        });
      }
    } else if (file) {
      toast.error("Please select a valid PDF file");
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      setPdfFile(droppedFile);
      // Clear any PDF URL error
      if (errors.pdfUrl) {
        setErrors({
          ...errors,
          pdfUrl: "",
        });
      }
    } else if (droppedFile) {
      toast.error("Please drop a valid PDF file");
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Chapter title is required";
    }

    if (!formData.chapterNo) {
      newErrors.chapterNo = "Chapter number is required";
    } else if (isNaN(formData.chapterNo) || Number(formData.chapterNo) <= 0) {
      newErrors.chapterNo = "Chapter number must be a positive number";
    }

    if (!pdfFile && !formData.pdfUrl.trim()) {
      newErrors.pdfUrl = "PDF file or URL is required";
    } else if (!pdfFile && formData.pdfUrl.trim() && !formData.pdfUrl.startsWith("http")) {
      newErrors.pdfUrl = "Please enter a valid URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let finalPdfUrl = formData.pdfUrl;

      // If PDF file is selected, upload it
      if (pdfFile) {
        try {
          setIsUploading(true);
          finalPdfUrl = await uploadPdf(pdfFile, (progress) => {
            setUploadProgress(progress);
          });
          setIsUploading(false);
        } catch (error) {
          toast.error("Failed to upload PDF. Please try again or use a URL.");
          setIsUploading(false);
          setIsSubmitting(false);
          return;
        }
      }

      // Update chapter with the PDF URL
      updateChapter({
        bookId,
        title: formData.title,
        chapterNo: Number(formData.chapterNo),
        pdfUrl: finalPdfUrl,
      });
    } catch (error) {
      console.error("Update chapter error:", error);
      setIsSubmitting(false);
      toast.error("Failed to update chapter");
    }
  };

  // Handle click outside to close modal
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center px-4" onClick={handleClickOutside}>
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Chapter <span className="text-primary">#{chapter.chapterNo}</span>
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Chapter Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Chapter Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter chapter title"
              className={`w-full px-3 py-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Chapter Number */}
          <div className="mb-4">
            <label htmlFor="chapterNo" className="block text-sm font-medium text-gray-700 mb-1">
              Chapter Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="chapterNo"
              name="chapterNo"
              value={formData.chapterNo}
              onChange={handleChange}
              placeholder="Enter chapter number"
              min="1"
              className={`w-full px-3 py-2 border ${
                errors.chapterNo ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.chapterNo && <p className="mt-1 text-sm text-red-500">{errors.chapterNo}</p>}
          </div>

          {/* Current PDF */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Current PDF</label>
            <div className="bg-gray-50 p-3 rounded-md">
              <a href={formData.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 flex items-center">
                <FaUpload className="mr-2" />
                View current PDF
              </a>
            </div>
          </div>

          {/* PDF Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Replace PDF</label>

            {/* Upload section with drag & drop */}
            <div
              className={`border-2 border-dashed ${
                isDragging ? "border-primary bg-primary/5" : "border-gray-300"
              } rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors mb-3`}
              onClick={() => fileInputRef.current.click()}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/pdf" className="hidden" />

              {!pdfFile ? (
                <div className="py-4">
                  <FaUpload className={`mx-auto h-10 w-10 ${isDragging ? "text-primary" : "text-gray-400"} mb-2`} />
                  <p className={`text-sm ${isDragging ? "text-primary font-medium" : "text-gray-600"}`}>
                    {isDragging ? "Drop your PDF file here" : "Click or drag & drop to upload a new PDF file"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Max file size: 10MB</p>
                </div>
              ) : (
                <div className="py-4">
                  <div className="bg-green-50 text-green-800 py-2 px-4 rounded-md mb-2 flex items-center">
                    <FaUpload className="mr-2" />
                    <span className="font-medium">{pdfFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPdfFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove file
                  </button>
                </div>
              )}
            </div>

            {/* OR divider */}
            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 text-sm text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* PDF URL */}
            <div>
              <label htmlFor="pdfUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Update PDF URL
              </label>
              <input
                type="text"
                id="pdfUrl"
                name="pdfUrl"
                value={formData.pdfUrl}
                onChange={handleChange}
                placeholder="https://example.com/chapter.pdf"
                className={`w-full px-3 py-2 border ${
                  errors.pdfUrl ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
              />
              {errors.pdfUrl && <p className="mt-1 text-sm text-red-500">{errors.pdfUrl}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting || isUploading ? (
                <span className="flex items-center">
                  <CgSpinner className="animate-spin mr-2" />
                  {isUploading ? `Uploading ${uploadProgress.toFixed(0)}%` : "Updating..."}
                </span>
              ) : (
                "Update Chapter"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChapterModal;
