import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Upload.module.css';
import { API_URL } from '../../../config';

const UploadPage = () => {
    // State to store the uploaded file
    const [uploadedFile, setUploadedFile] = useState(null);
    // State to store the captured image from camera
    const [capturedImage, setCapturedImage] = useState(null);
    // State to track loading while prediction is happening
    const [isLoading, setIsLoading] = useState(false);
    // React Router navigation hook
    const navigate = useNavigate();
    // References to video and canvas DOM elements
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Function to start the device camera
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } catch (err) {
            console.error("Camera access error:", err);
        }
    };

    // Function to capture a photo from the video stream
    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 300, 200);
        const imageDataURL = canvas.toDataURL('image/png');
        setCapturedImage(imageDataURL);
        setUploadedFile(null); // Clear uploaded file if capturing new photo

        // Stop the video stream after capturing
        const stream = videoRef.current.srcObject;
        const tracks = stream?.getTracks();
        tracks?.forEach(track => track.stop());
        videoRef.current.srcObject = null;
    };

    // Handle file selection from the user
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);
            setCapturedImage(null); // Clear captured image if uploading new file
        }
    };

    // Remove selected file or captured image
    const handleRemoveFile = () => {
        setUploadedFile(null);
        setCapturedImage(null);
    };

    // Handle uploading/captured image and view disease details
    const handleViewDetails = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            let isVideo = false;

            if (uploadedFile) {
                formData.append('file', uploadedFile);
                isVideo = uploadedFile.type.startsWith('video/');
            } else if (capturedImage) {
                const res = await fetch(capturedImage);
                const blob = await res.blob();
                formData.append('file', blob, 'captured-image.png');
            } else {
                alert("Please upload or capture an image.");
                setIsLoading(false);
                return;
            }

            // Decide endpoint based on file type (video or image)
            const url = isVideo
                ? (`${API_URL}/predict/video-predict/`)
                : (`${API_URL}/predict/predict/`);

            // Make a POST request to backend for prediction
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error(`Prediction failed: ${response.statusText}`);

            let data;
            try {
                data = await response.json();
            } catch (jsonErr) {
                console.error("Failed to parse JSON:", jsonErr);
                alert("Prediction succeeded but response was invalid.");
                setIsLoading(false);
                return;
            }

            console.log("Prediction result:", data);
            // Navigate to the details page with the prediction data
            navigate('/disease-details', { state: data });

        } catch (err) {
            console.error("Error predicting disease:", err);
            alert("Failed to predict disease. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={style.uploadContainer}>
            {/* Title */}
            <h2 className={style.title}>Upload or Capture File</h2>

            {/* File upload input */}
            <label htmlFor="fileInput" className={style.inputLabel}>Choose from Files</label>
            <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                accept="image/*,video/*"
                className={style.hiddenInput}
            />

            {/* Button to open device camera */}
            <button onClick={startCamera} className={style.captureBtn}>Open Camera</button>
            {/* Live video preview */}
            <video ref={videoRef} className={style.videoPreview} width="300" height="200" />

            {/* Button to capture photo */}
            <button onClick={capturePhoto} className={style.captureBtn}>Capture Photo</button>
            {/* Hidden canvas used for capturing frame from video */}
            <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }} />

            {/* Preview and actions if file is uploaded */}
            {uploadedFile && (
                <>
                    <p className={style.previewText}>Uploaded File: {uploadedFile.name}</p>
                    <button
                        onClick={handleViewDetails}
                        className={style.captureBtn}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'View Details'}
                    </button>
                    <button onClick={handleRemoveFile} className={style.removeBtn}>Remove File</button>
                </>
            )}

            {/* Preview and actions if photo is captured */}
            {capturedImage && (
                <>
                    <img src={capturedImage} alt="Captured" className={style.imagePreview} />
                    <button
                        onClick={handleViewDetails}
                        className={style.captureBtn}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'View Details'}
                    </button>
                    <button onClick={handleRemoveFile} className={style.removeBtn}>Remove Image</button>
                </>
            )}
        </div>
    );
};

export default UploadPage;
