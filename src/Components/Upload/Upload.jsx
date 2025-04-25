// import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import style from './Upload.module.css';

// const UploadPage = () => {
//     const [uploadedFile, setUploadedFile] = useState(null);
//     const [capturedImage, setCapturedImage] = useState(null);
//     const navigate = useNavigate();
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);

//     const startCamera = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             videoRef.current.srcObject = stream;
//             videoRef.current.play();
//         } catch (err) {
//             console.error("Camera access error:", err);
//         }
//     };

//     const capturePhoto = () => {
//         const context = canvasRef.current.getContext('2d');
//         context.drawImage(videoRef.current, 0, 0, 300, 200);
//         const imageDataURL = canvasRef.current.toDataURL('image/png');
//         setCapturedImage(imageDataURL);
    
//         // Stop the camera stream after capturing
//         const stream = videoRef.current.srcObject;
//         const tracks = stream?.getTracks();
//         tracks?.forEach(track => track.stop());
//         videoRef.current.srcObject = null; // Clear the video element
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setUploadedFile(file);
//             setCapturedImage(null);
//         }
//     };

//     const handleViewDetails = () => {
//         // You can add a real API call here later
//         const dummyDiseaseData = {
//             name: "Leaf Blight",
//             cure: "Use fungicide containing Mancozeb or Chlorothalonil",
//             precaution: "Avoid overhead irrigation, space plants properly",
//             causes: "Fungal infection from wet/humid conditions",
//             treatmentProducts: ["BlightCare-X", "CropGuard Pro"],
//             consultant: {
//                 name: "Dr. Ramesh Patel",
//                 contact: "ramesh.patel@agrocare.com"
//             }
//         };
//         navigate('/disease-details', { state: dummyDiseaseData });
//     };

//     return (
//         <div className={style.uploadContainer}>
//             <h2 className={style.title}>Upload or Capture File</h2>

//             <label htmlFor="fileInput" className={style.inputLabel}>Choose from Files</label>
//             <input 
//                 type="file" 
//                 id="fileInput"
//                 onChange={handleFileChange}
//                 accept="image/*,video/*"
//                 className={style.hiddenInput}
//             />

//             <button onClick={startCamera} className={style.captureBtn}>Open Camera</button>
//             <video ref={videoRef} className={style.videoPreview} width="300" height="200" />

//             <button onClick={capturePhoto} className={style.captureBtn}>Capture Photo</button>
//             <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }} />

//             {uploadedFile && (
//                 <>
//                     <p className={style.previewText}>Uploaded File: {uploadedFile.name}</p>
//                     <button onClick={handleViewDetails} className={style.captureBtn}>
//                         View Details
//                     </button>
//                 </>
//             )}

//             {capturedImage && (
//                 <>
//                     <img src={capturedImage} alt="Captured" className={style.imagePreview} />
//                     <button onClick={handleViewDetails} className={style.captureBtn}>
//                         View Details
//                     </button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default UploadPage;
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Upload.module.css';
import { API_URL } from '../../../config';
const UploadPage = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } catch (err) {
            console.error("Camera access error:", err);
        }
    };

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 300, 200);
        const imageDataURL = canvas.toDataURL('image/png');
        setCapturedImage(imageDataURL);
        setUploadedFile(null);

        const stream = videoRef.current.srcObject;
        const tracks = stream?.getTracks();
        tracks?.forEach(track => track.stop());
        videoRef.current.srcObject = null;
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);
            setCapturedImage(null);
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setCapturedImage(null);
    };

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

            const url = isVideo
                ? (`${API_URL}/predict/video-predict/`)
                : (`${API_URL}/predict/predict/`);

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
            <h2 className={style.title}>Upload or Capture File</h2>

            <label htmlFor="fileInput" className={style.inputLabel}>Choose from Files</label>
            <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                accept="image/*,video/*"
                className={style.hiddenInput}
            />

            <button onClick={startCamera} className={style.captureBtn}>Open Camera</button>
            <video ref={videoRef} className={style.videoPreview} width="300" height="200" />

            <button onClick={capturePhoto} className={style.captureBtn}>Capture Photo</button>
            <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }} />

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


