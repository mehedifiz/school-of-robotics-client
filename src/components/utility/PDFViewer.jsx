// src/components/utility/PDFViewer.jsx
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FaChevronLeft, FaChevronRight, FaDownload, FaSpinner } from "react-icons/fa";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl, title }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadError(error) {
    console.error("Error loading PDF:", error);
    setError("Failed to load the PDF. Please try again later.");
    setLoading(false);
  }

  function changePage(offset) {
    const newPage = pageNumber + offset;
    if (newPage >= 1 && newPage <= numPages) {
      setPageNumber(newPage);
    }
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2.0));
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
      {/* PDF Title */}
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      )}

      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md disabled:opacity-50"
            aria-label="Previous page"
          >
            <FaChevronLeft />
          </button>
          <span className="text-sm">
            Page {pageNumber} of {numPages || "--"}
          </span>
          <button
            onClick={nextPage}
            disabled={pageNumber >= numPages}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md disabled:opacity-50"
            aria-label="Next page"
          >
            <FaChevronRight />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md"
            aria-label="Zoom out"
          >
            -
          </button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <button
            onClick={zoomIn}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md"
            aria-label="Zoom in"
          >
            +
          </button>
          
          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 bg-primary text-white px-3 py-1 rounded-md flex items-center gap-1 hover:bg-primary/90"
          >
            <FaDownload size={14} /> Download
          </a>
        </div>
      </div>

      {/* PDF Document */}
      <div className="border border-gray-200 rounded-lg overflow-auto bg-gray-50 flex justify-center">
        {error ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            >
              Reload
            </button>
          </div>
        ) : (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center h-[500px]">
                <FaSpinner className="animate-spin text-primary text-4xl" />
              </div>
            }
          >
            {loading ? (
              <div className="flex items-center justify-center h-[500px]">
                <FaSpinner className="animate-spin text-primary text-4xl" />
              </div>
            ) : (
              <Page 
                pageNumber={pageNumber} 
                scale={scale} 
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            )}
          </Document>
        )}
      </div>

      {/* Bottom navigation for mobile */}
      <div className="flex justify-between mt-4 md:hidden">
        <button
          onClick={previousPage}
          disabled={pageNumber <= 1}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={pageNumber >= numPages}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;