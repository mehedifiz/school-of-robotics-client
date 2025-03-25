import { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFViewer = ({ pdfUrl, title }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
      {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}

      <div className="border border-gray-200 rounded-lg h-[600px]">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} defaultScale={1.0} />
        </Worker>
      </div>
    </div>
  );
};

export default PDFViewer;
