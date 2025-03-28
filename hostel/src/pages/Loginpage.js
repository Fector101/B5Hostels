import { useState } from "react";
import { Mail, Lock, Bed } from "lucide-react";
import './../components/css/login-signuppage.css'
import GoToTop from "../components/js/GoToTop";
import { Link } from "react-router-dom";
import NotSignedIn from "../components/ui/header/NotSignedIn";

export default function Loginpage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <div className="form-page page">
           <NotSignedIn/>
            <div className="form-box">
                <div className="icon-circle">
                    <Bed />
                </div>
                <h2>Welcome Back</h2>
                <p className="subtitle">Login to manage your hostel account</p>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <div className="input-group">
                        <Mail className="icon" />
                        <input
                            type="email"
                            placeholder="youremail@nsuk.edu.ng"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <label>Password</label>
                    <div className="input-group">
                        <Lock className="icon" />
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="primary-btn signin-btn">Sign in</button>
                </form>
                <div className='row redirect'>
                    <p>Don't have an account?</p>
                    <Link to='/signup' >Sign Up</Link>
                </div>
            </div>
            <GoToTop />

        </div>
    );
}
