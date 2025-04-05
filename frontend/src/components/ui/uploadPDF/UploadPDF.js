import { useContext,useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios"; // Importing axios
import { UserContext } from '../../js/UserContext';

import './uploadpdf.css';


const UploadPDF = ({ total_uploaded_docs }) => {
        const { setUser } = useContext(UserContext);
    
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null); // Create a reference to the file input

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        if (selectedFile.type !== "application/pdf") {
            toast("Only PDF files are allowed.", { type: "warning" });
            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            toast("File size exceeds 5MB - too large", { type: "warning" });
            return;
        }

        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            toast("Please select a PDF file to upload.", { type: "warning" });
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);

        try {
            setIsUploading(true);
            setUploadProgress(0); // Reset progress at the start of the upload

            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        // Update progress as the file uploads
                        if (progressEvent.total) {
                            const progress = Math.round(
                                (progressEvent.loaded / progressEvent.total) * 100
                            );
                            setUploadProgress(progress);
                        }
                    },
                    withCredentials: true, // Allow credentials (cookies) with CORS
                }
            );

            if (response.status === 200) {
                setUser(old => ({
                    ...old,
                    pdfs_length: old.pdfs_length + 1,
                }));
                // console.log("Upload response: ", response.data);
                toast(response.data.msg || "Upload successful!", { type: "success" });
            } else {
                toast(response.data.msg || "Upload failed.", { type: "warning" });
            }
        } catch (error) {
            console.error("Upload error response: ", error.response);
            console.error("Upload error response data: ", error.response.data);
            const msg = error.response?.data?.msg || "Something went wrong during upload.";
            toast(msg, { type: "error" });
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            setFile(null);

            // Clear the file input after the upload attempt
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className="upload-pdf-container">
            {isUploading && (
                <div className="modal uploading-modal">
                    <div className="spinner"></div>
                    <p>Uploading PDF ... {uploadProgress ? uploadProgress - 1 : uploadProgress}% </p>
                </div>
            )}

            <h3>Upload Your Document for Verification</h3>

            <input
                ref={fileInputRef} // Attach ref to the file input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                disabled={isUploading}
            />

            <button
                className="primary-btn"
                onClick={handleUpload}
                disabled={isUploading}
            >
                Upload PDF
            </button>

            <p className="caption">
                You’ve uploaded {total_uploaded_docs} of 4 allowed documents.
            </p>
        </div>
    );
};

export default UploadPDF;
