import React from 'react';
import { useReactFlow, getNodesBounds, getViewportForBounds } from '@xyflow/react';
import { toPng } from 'html-to-image';

// Ideal image canvas export variables
const imageWidth = 1024;
const imageHeight = 768;

const DownloadButton = () => {
  const { getNodes, reactFlowWrapper } = useReactFlow();

  const handleDownload = () => {
    const nodes = getNodes();
    if (nodes.length === 0) return;

    // 1. Calculate the exact bounding box around all current canvas nodes
    const nodesBounds = getNodesBounds(nodes);
    
    // 2. Transform bounding coordinates into a cleanly centered viewport matrix
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5, // Min Zoom
      2.0, // Max Zoom
      0.1  // Padding buffer around the outer edges
    );

    // 3. Select the core React Flow viewport DOM wrapper element to capture
    const elementToCapture = document.querySelector('.react-flow__viewport');

    if (elementToCapture) {
      toPng(elementToCapture, {
        backgroundColor: '#FEFCE8', // Matches your custom canvas background color hex rule
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          // Forces the snapshot to look exactly like the calculated centered viewport bounds
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      })
        .then((dataUrl) => {
          // 4. Spawn an absolute temporary anchor link download loop to trigger the file save
          const downloadLink = document.createElement('a');
          downloadLink.download = `diagram_${Date.now()}.png`;
          downloadLink.href = dataUrl;
          downloadLink.click();
        })
        .catch((error) => {
          console.error('HTML-to-Image canvas snapshot compilation rendering failed:', error);
        });
    }
  };

  return (
    <button
      onClick={handleDownload}
      // Stays aligned with your bold, interactive Neo-Brutalist design language
      className="absolute top-4 right-4 z-50 text-xs font-black uppercase tracking-wider bg-fuchsia-400 text-black border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_#000000] hover:bg-black hover:text-white transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
    >
      Export PNG
    </button>
  );
};

export default DownloadButton;