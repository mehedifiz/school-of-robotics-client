import useAxios from "@/Hooks/useAxios";
import uploadImage from "@/utils/uploadImage";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { FaTimes } from "react-icons/fa";

const UpdateBookModal = ({ props }) => {
  const { setIsUpdateModalOpen, book } = props;
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image upload states
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const imageRef = useRef(null);

  // Form state - initialize with book data
  const [updatedBook, setUpdatedBook] = useState({
    name: "",
    author: "",
    description: "",
    thumbnail: "",
    plan: "basic",
  });

  // Form errors
  const [errors, setErrors] = useState({});

  // Set initial form data when book prop changes
  useEffect(() => {
    if (book) {
      setUpdatedBook({
        name: book.name || "",
        author: book.author || "",
        description: book.description || "",
        thumbnail: book.thumbnail || "",
        plan: book.plan || "basic",
      });

      // Set the thumbnail preview if it exists
      if (book.thumbnail) {
        setImagePreview(book.thumbnail);
      }
    }
  }, [book]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({
      ...updatedBook,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle plan selection
  const handlePlanChange = (plan) => {
    setUpdatedBook({
      ...updatedBook,
      plan,
    });

    if (errors.plan) {
      setErrors({
        ...errors,
        plan: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!updatedBook.name.trim()) {
      newErrors.name = "Book name is required";
    }

    if (!updatedBook.description.trim()) {
      newErrors.description = "Description is required";
    }

    // If using URL input but no image is uploaded
    if (!image && !updatedBook.thumbnail.trim()) {
      newErrors.thumbnail = "Thumbnail is required (upload an image or provide a URL)";
    } else if (!image && !imagePreview && !/^https?:\/\/.+/.test(updatedBook.thumbnail)) {
      newErrors.thumbnail = "Please enter a valid URL starting with http:// or https://";
    }

    if (!updatedBook.author.trim()) {
      newErrors.author = "Author name is required";
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
      // If a new image file was uploaded, handle that first
      let thumbnailUrl = updatedBook.thumbnail;

      if (image) {
        try {
          setIsUploading(true);
          // Use the uploadImage utility to upload to Cloudinary
          thumbnailUrl = await uploadImage(image);
          setIsUploading(false);
        } catch (uploadError) {
          console.log(uploadError);
          setIsUploading(false);
          toast.error("Failed to upload image. Please try again or use a URL instead.");
          setIsSubmitting(false);
          return;
        }
      }

      const response = await axios.patch(`/book/${book._id}`, {
        ...updatedBook,
        thumbnail: thumbnailUrl,
      });

      if (response.data.success) {
        toast.success("Book updated successfully!");
        // Refresh the books list
        queryClient.invalidateQueries(["books"]);
        // Close the modal
        setIsUpdateModalOpen(false);
      } else {
        toast.error(response.data.message || "Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal when clicking outside
  const handleClickOutsideModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsUpdateModalOpen(false);
    }
  };

  // Image handling functions
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      // Don't set imagePreview here - we'll use URL.createObjectURL in the render
      setImagePreview(null); // Clear the existing preview

      // Clear URL input since we're using an uploaded image
      setUpdatedBook({
        ...updatedBook,
        thumbnail: "",
      });

      // Clear any thumbnail errors
      if (errors.thumbnail) {
        setErrors({
          ...errors,
          thumbnail: "",
        });
      }
    }
  };

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
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));

      // Clear URL input since we're using an uploaded image
      setUpdatedBook({
        ...updatedBook,
        thumbnail: "",
      });

      // Clear any thumbnail errors
      if (errors.thumbnail) {
        setErrors({
          ...errors,
          thumbnail: "",
        });
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);

    // If we're removing a newly uploaded image, go back to the original thumbnail if it exists
    if (book && book.thumbnail && image) {
      setImagePreview(book.thumbnail);
      setUpdatedBook({
        ...updatedBook,
        thumbnail: book.thumbnail,
      });
    } else {
      setImagePreview(null);
      setUpdatedBook({
        ...updatedBook,
        thumbnail: "",
      });
    }

    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  return (
    <div className="modal-overlay cursor-not-allowed fixed inset-0 bg-black/50 z-[99] flex items-center justify-center px-4" onClick={handleClickOutsideModal}>
      <div
        className="bg-white cursor-default w-full max-w-xl p-6 rounded-xl shadow-lg relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">Update Book</h2>
          <button onClick={() => setIsUpdateModalOpen(false)} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Book Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Book Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedBook.name}
              onChange={handleInputChange}
              placeholder="Enter book name"
              className={`w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Author */}
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={updatedBook.author}
              onChange={handleInputChange}
              placeholder="Enter author name"
              className={`w-full px-3 py-2 border ${
                errors.author ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={updatedBook.description}
              onChange={handleInputChange}
              placeholder="Enter book description"
              rows="3"
              className={`w-full px-3 py-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Thumbnail Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Thumbnail <span className="text-red-500">*</span>
            </label>

            {/* Current thumbnail info */}
            {imagePreview && !image && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Current thumbnail:</p>
                <div className="flex items-center gap-4">
                  <img src={imagePreview} alt="Current thumbnail" className="h-16 w-16 rounded-md object-cover" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">Using existing image</p>
                    <button type="button" onClick={() => setImagePreview(null)} className="text-red-500 hover:text-red-700 text-xs mt-1">
                      Remove and upload new
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Section - show if no existing image preview or if a new image is selected */}
            {(!imagePreview || image) && (
              <div
                className={`mb-3 bg-primary/5 rounded-xl text-center border-2 border-dashed border-primary/20 hover:bg-primary/10 transition-colors ${
                  isDragging ? "bg-primary/10" : ""
                }`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="relative flex flex-col items-center">
                  <input ref={imageRef} type="file" accept="image/*" className="opacity-0 absolute size-full cursor-pointer" onChange={handleImageChange} />
                  <div className="p-6 flex flex-col items-center">
                    {isUploading ? (
                      <div className="flex items-center gap-2">
                        <CgSpinner className="animate-spin w-6 h-6 text-primary" />
                        <p className="text-primary">Uploading image...</p>
                      </div>
                    ) : (
                      <>
                        {image ? (
                          <div className="w-full">
                            <img src={URL.createObjectURL(image)} alt="Book thumbnail" className="w-40 h-40 object-cover rounded-xl mx-auto" />
                            <button type="button" onClick={handleRemoveImage} className="mt-2 text-sm text-red-500 hover:text-red-700 relative">
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg className="w-12 h-12 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-primary mb-1">Upload New Book Cover</p>
                            <p className="text-sm text-gray-500">Click or drag and drop an image</p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* OR Divider - only show if no image is selected and no preview exists */}
            {!imagePreview && !image && (
              <div className="flex items-center my-3">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-3 text-sm text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            )}

            {/* URL Input - only show if no image is uploaded or previewed */}
            {!imagePreview && !image && (
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  id="thumbnail"
                  name="thumbnail"
                  value={updatedBook.thumbnail}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-3 py-2 border ${
                    errors.thumbnail ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
                />
                {updatedBook.thumbnail && !errors.thumbnail && (
                  <div className="mt-2">
                    <img
                      src={updatedBook.thumbnail}
                      alt="Thumbnail preview"
                      className="h-20 w-auto object-cover rounded-md border border-gray-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150?text=Invalid+Image";
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {errors.thumbnail && <p className="mt-1 text-sm text-red-500">{errors.thumbnail}</p>}
          </div>

          {/* Subscription Plan */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subscription Plan <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {["basic", "standard", "premium"].map((plan) => (
                <button
                  key={plan}
                  type="button"
                  onClick={() => handlePlanChange(plan)}
                  className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none ${
                    updatedBook.plan === plan
                      ? plan === "basic"
                        ? "bg-blue-100 text-blue-800 border border-blue-300"
                        : plan === "standard"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-purple-100 text-purple-800 border border-purple-300"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </button>
              ))}
            </div>
            {errors.plan && <p className="mt-1 text-sm text-red-500">{errors.plan}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsUpdateModalOpen(false)}
              className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;
