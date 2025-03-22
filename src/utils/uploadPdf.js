import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client - add these to your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Uploads a PDF file to Supabase Storage
 * @param {File} file - The PDF file to upload
 * @param {Function} onProgress - Optional callback for upload progress
 * @returns {Promise<string>} The URL of the uploaded PDF
 */
const uploadPdf = async (file, onProgress) => {
  if (!file || file.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed.");
  }

  try {
    // Create a unique filename
    const timestamp = new Date().getTime();
    const uniqueFileName = `${timestamp}_${file.name.replace(/\s+/g, "_")}`;

    // Since Supabase doesn't support progress tracking directly,
    // simulate progress for better UX
    let uploadProgress = 0;
    const progressInterval = setInterval(() => {
      uploadProgress += 5;
      if (uploadProgress > 95) {
        clearInterval(progressInterval);
        uploadProgress = 95;
      }
      if (onProgress) {
        onProgress(uploadProgress);
      }
    }, 100);

    // Upload the file
    const { data, error } = await supabase.storage.from("pdfs").upload(uniqueFileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

    // Clear progress interval
    clearInterval(progressInterval);

    if (error) {
      throw error;
    }

    // Complete progress
    if (onProgress) {
      onProgress(100);
    }

    // Get public URL
    const { data: publicURLData } = supabase.storage.from("pdfs").getPublicUrl(data.path);

    return publicURLData.publicUrl;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    throw new Error("Failed to upload PDF");
  }
};

export default uploadPdf;
