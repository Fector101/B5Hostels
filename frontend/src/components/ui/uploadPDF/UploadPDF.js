import { useState } from "react";
import { toast } from "react-toastify";
import './uploadpdf.css';
const UploadPDF = ({total_uploaded_docs}) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files[0].size > 5 * 1024 * 1024) {
            toast('File size exceeds 5MB - too large', { type: 'warning' });
            return
        }
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            toast('Please select a PDF file to upload.', { type: 'warning' });
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
                method: "POST",
                body: formData,
                credentials: "include",

            });

            const data = await response.json();

            if (response.ok) {
                console.log("Upload Successful:", data);
                toast(data.msg || 'Upload successful!', { type: 'success' });
            } else {
                console.error("Upload error:", data);
                toast(data.msg || 'Upload Timeout -e', { type: 'warning' });
            }

        } catch (error) {
            // toast('Something went wrong -' + error, { type: 'error' });
            toast('....', { type: 'error' });
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="upload-pdf-container">
            <h3>Upload Your Document for Verification</h3>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button className="primary-btn" onClick={handleUpload}>Upload PDF</button>
            <p className='caption'> You’ve uploaded {total_uploaded_docs} of 4 allowed documents.</p>
        </div>
    );
};

export default UploadPDF;
