import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface ScannerProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Scanner: React.FC<ScannerProps> = ({ isVisible, setIsVisible }) => {
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Function to close the scanner (set visibility to false)
  const closeScanner = () => setIsVisible(false);

  useEffect(() => {
    // If the scanner is visible, start the scanner
    if (isVisible) {
      const scanner = new Html5QrcodeScanner("reader", {
        qrbox: { width: 250, height: 250 },
        fps: 5, // Frame rate for the scanner
      },false);

      // Success callback when QR is detected
      const success = (result: string) => {
        setScanResult(result);  // Store the scan result
        closeScanner();         // Close the scanner automatically after a successful scan
      };

      // Error callback for scanner
      const error = (err: any) => {
        console.warn("Scanner error:", err);
      };

      // Start the scanner
      scanner.render(success, error);

      // Clean up the scanner when the component unmounts or the overlay is closed
      return () => {
        scanner.clear();
      };
    }
  }, [isVisible]);

  return (
    <>
      {/* Full-screen overlay for the scanner */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
            <div id="reader"></div>
            {scanResult && (
              <div className="mt-4">
                <strong>Scan Success:</strong>
                <a
                  href={scanResult}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {scanResult}
                </a>
              </div>
            )}
            {/* Button to close the scanner */}
            <button
              onClick={closeScanner}
              className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Close Scanner
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Scanner;
