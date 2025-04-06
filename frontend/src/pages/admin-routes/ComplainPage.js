import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import '../../components/css/admincomplainpage.css'; // Style file for the complaints page
import { RefreshCcw } from "lucide-react";
import { UserContext } from '../../components/js/UserContext';

export default function AdminComplaintsPage() {
    const { ComplaintsContext } = useContext(UserContext);

    const [complaints, setComplaints] = useState(()=>ComplaintsContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log('ComplaintsContext ',ComplaintsContext)
        setComplaints(ComplaintsContext)
        setLoading(false);

    }, [ComplaintsContext])

    const fetchComplaints = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/complaints`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                toast(data.msg || "Successfully Refresh complaints.", { type: "success" });
                setComplaints(data.complaints);
            } else {
                toast(data.msg || "Failed to fetch complaints.", { type: "error" });
            }
        } catch (error) {
            toast("Error fetching complaints: " + error.message, { type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const resolveComplaint = async (complaintId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/complaints/${complaintId}/resolve`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                toast(data.msg || "Complaint resolved successfully.", { type: "success" });
                fetchComplaints(); // Refresh complaints list
            } else {
                toast(data.msg || "Failed to resolve complaint.", { type: "error" });
            }
        } catch (error) {
            toast("Error resolving complaint: " + error.message, { type: "error" });
        }
    };

    return (
        <div className="admin-complaints-page page">
            <div className="flex">
                <h1>Complaints Management</h1>
                <button className="refresh-btn" onClick={fetchComplaints}>
                    <RefreshCcw />
                </button>
            </div>
            {loading ? (
                <div className="loading">Loading complaints...</div>
            ) : (
                <div className="complaints-list">
                    {complaints.length === 0 ? (
                        <p>No complaints available.</p>
                    ) : (
                        complaints.map((complaint) => (
                            <div key={complaint._id} className="complaint-card">
                                <h3>{complaint.title}</h3>
                                <p><strong>Message:</strong> {complaint.message}</p>
                                <p><strong>Status:</strong> {complaint.status}</p>
                                <p><strong>Submitted by:</strong> {complaint.matric_no}</p>
                                <div className="actions">
                                    {complaint.status !== "Resolved" && (
                                        <button
                                            onClick={() => resolveComplaint(complaint._id)}
                                            className="resolve-btn"
                                        >
                                            Mark as Resolved
                                        </button>
                                    )}

                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
