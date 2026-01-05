import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, X } from 'lucide-react';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment" // Use back camera on mobile
};

export function CameraCapture({ onCapture, onCancel }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const confirm = () => {
    if (imgSrc) {
      onCapture(imgSrc);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onCancel}
            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
          >
            <X size={24} />
          </button>
        </div>

        <div className="relative aspect-video bg-black">
          {imgSrc ? (
            <img src={imgSrc} alt="Captured" className="w-full h-full object-contain" />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <div className="p-6 flex justify-around items-center bg-gray-900">
          {!imgSrc ? (
            <button 
              onClick={capture}
              className="p-4 bg-white rounded-full shadow-lg active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-full border-4 border-blue-600 flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
              </div>
            </button>
          ) : (
            <>
              <button 
                onClick={retake}
                className="flex flex-col items-center text-gray-300 hover:text-white"
              >
                <div className="p-3 bg-gray-800 rounded-full mb-1">
                  <RefreshCw size={24} />
                </div>
                <span className="text-xs">Retake</span>
              </button>

              <button 
                onClick={confirm}
                className="flex flex-col items-center text-blue-400 hover:text-blue-300"
              >
                <div className="p-3 bg-blue-900/50 rounded-full mb-1 border border-blue-500">
                  <Camera size={24} />
                </div>
                <span className="text-xs">Use Photo</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
