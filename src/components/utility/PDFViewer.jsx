import { TfiGallery } from "react-icons/tfi";
import { useState } from "react";
import { Viewer, Worker, SpecialZoomLevel, ProgressBar } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail"; // Import the thumbnail plugin

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css"; // Import styles for thumbnail plugin
import useAuth from "@/Hooks/useAuth";

const PDFViewer = ({ pdfUrl, title }) => {
  const { user } = useAuth();
  const [numPages, setNumPages] = useState(0);
  const [thumbnailVisible, setThumbnailVisible] = useState(false); // State to toggle thumbnails

  // Create individual plugins instead of defaultLayoutPlugin
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const thumbnailPluginInstance = thumbnailPlugin(); // Initialize the thumbnail plugin

  // Get plugin components
  const { CurrentPageInput, GoToNextPage, GoToPreviousPage, NumberOfPages } = pageNavigationPluginInstance;
  const { ZoomIn, ZoomOut, Zoom } = zoomPluginInstance;
  const { EnterFullScreen } = fullScreenPluginInstance;
  const { Thumbnails } = thumbnailPluginInstance; // Access the Thumbnails component from the plugin

  // Create a custom watermark with user info
  const watermarkStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const watermarkTextStyle = {
    transform: "rotate(-45deg)",
    fontSize: "2em",
    color: "rgba(200, 200, 200, 0.2)",
    userSelect: "none",
    whiteSpace: "nowrap",
    textAlign: "center",
  };

  const toggleThumbnails = () => {
    setThumbnailVisible(!thumbnailVisible); // Toggle the thumbnail visibility
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
      {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}

      <div className="mb-4 bg-amber-50 text-amber-800 p-3 rounded-md border border-amber-200 text-sm">
        <p className="font-semibold">Copyright Notice</p>
        <p>
          This material is protected by copyright law. Unauthorized reproduction or distribution is prohibited. Access is provided for personal educational use
          only.
        </p>
      </div>

      {/* Custom toolbar */}
      <div className="rpv-toolbar mb-2 p-1 border-b border-gray-200 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Toggle Thumbnail Button */}
          <button onClick={toggleThumbnails} className={`p-2 rounded-md ${thumbnailVisible ? "bg-gray-200 text-gray-600" : ""}`}>
            <TfiGallery />
          </button>
          <GoToPreviousPage />
          <div className="flex items-center">
            <CurrentPageInput /> <span className="mx-1">/</span> <NumberOfPages />
          </div>
          <GoToNextPage />
        </div>
        <div className="flex items-center space-x-2">
          <ZoomOut />
          <Zoom />
          <ZoomIn />
          <EnterFullScreen />
        </div>
      </div>

      <div className="flex">
        {/* Thumbnail Sidebar */}
        {/* {thumbnailVisible && ( */}
        <div className={`${thumbnailVisible ? "w-20" : "w-0"} border-r border-gray-200 overflow-y-auto duration-500`}>
          <Thumbnails />
        </div>
        {/* )} */}

        {/* PDF Viewer */}
        <div className="border border-gray-200 rounded-lg h-[600px] relative flex-1">
          {/* Custom watermark */}
          <div style={watermarkStyle}>
            <div style={watermarkTextStyle}>
              {user?.phone || "Authorized User"} • {new Date().toLocaleDateString()}
            </div>
          </div>

          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfUrl}
              plugins={[
                pageNavigationPluginInstance,
                zoomPluginInstance,
                fullScreenPluginInstance,
                thumbnailPluginInstance, // Add the thumbnail plugin
              ]}
              defaultScale={SpecialZoomLevel.PageWidth}
              onDocumentLoad={({ numPages }) => setNumPages(numPages)}
              renderLoader={(percentages) => (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <ProgressBar progress={Math.round(percentages)} />
                    <p className="mt-2">Loading PDF...</p>
                  </div>
                </div>
              )}
            />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
