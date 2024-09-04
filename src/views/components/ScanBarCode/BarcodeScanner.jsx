import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader } from '@zxing/library';

const BarcodeScanner = ({ onScan }) => {
  const [scannedData, setScannedData] = useState(null);
  const [scanning, setScanning] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    const scanInterval = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const image = new Image();
          image.src = imageSrc;
          image.onload = () => {
            codeReader.decodeFromImage(image).then((result) => {
              if (result) {
                setScannedData(result.text);
                onScan(result.text);
                clearInterval(scanInterval); // Stop scanning after successful scan
              }
            }).catch((err) => {
              console.error('Scanning error:', err);
            });
          };
        }
      }
    }, 1000); // Adjust interval as needed

    return () => clearInterval(scanInterval); // Clean up on component unmount
  }, [onScan]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        height="100%"
      />
      <button onClick={() => setScanning(!scanning)}>
        {scanning ? 'Stop Scanning' : 'Start Scanning'}
      </button>
      {scannedData && <div>Scanned Data: {scannedData}</div>}
    </div>
  );
};

export default BarcodeScanner;
