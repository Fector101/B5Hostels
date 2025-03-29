import { ArrowRight, Bed, Bell, Calendar1, Vote } from "lucide-react";
import { Link } from "react-router-dom";
import "./newheader.css"

export default function NotSignedIn() {
    return (
        <div className="not-signed-header header signed-header">
            <div className="row">
                <Bed />
                <Link className="brand" to='/'>B5 Homes</Link>
            </div>
            <Link to='/login' className="btn login-btn">Login</Link>
            <Link to='/signup' className="btn signup-btn">Sign Up</Link>
        </div>
    )
}