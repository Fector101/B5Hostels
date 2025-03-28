import { ArrowRight, Bed, Bell, Calendar1, Vote } from "lucide-react";
import '../components/css/landingpage.css';
import { Link } from "react-router-dom";
import NotSignedIn from "../components/ui/header/NotSignedIn";

export default function Landingpage() {
    return (
        <div className="landingpage page">
            <NotSignedIn/>

            <div className="main">
                <h1>Student Hostel Management System</h1>
                <p className="header-desc caption">Join our platform for easy hostel allocation, room management, and a better student living experience.</p>
                <Link to='/signup' className="primary-btn">Get started <ArrowRight /></Link>
                <div className="features-box">
                    <div className="feature">
                        <Bed/>
                        <p>Room Allocation</p>
                    </div>
                    <div className="feature">
                        <Bell/>
                        <p>Maintenance Requests</p>
                    </div>
                    <div className="feature">
                        <Calendar1/>
                        <p>Payment Tracking</p>
                    </div>
                </div>
            </div>
        </div>
    )
}