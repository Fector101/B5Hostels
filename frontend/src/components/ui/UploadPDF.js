import { useState } from "react";
import { toast } from "react-toastify";

const UploadPDF = () => {
    const [file, setFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a PDF file to upload.");
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
                setPdfUrl(data.url);
                console.log("Upload Successful:", data);
                toast(data.msg || 'Upload successful!', { type: 'success' });
            } else {
                console.error("Upload error:", data);
                toast(data.msg || 'Upload Timeout -e', { type: 'warning' });
            }

        } catch (error) {
            toast('Something went wrong -' + error, { type: 'error' });
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload PDF</button>
            {pdfUrl && (
                <div>
                    <p>Uploaded PDF:</p>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                        View PDF
                    </a>
                </div>
            )}
        </div>
    );
};

export default UploadPDF;
