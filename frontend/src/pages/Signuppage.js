import '../components/css/login-signuppage.css';
import GoToTop from "../components/js/GoToTop";
import { useState } from "react";
import {  Lock,  IdCard, User, GraduationCap } from "lucide-react";
import { Link } from 'react-router-dom';
import NotSignedIn from '../components/ui/header/NotSignedIn';

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [matric_no, setMatricNo] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [level, setLevel] = useState("");
    const [gender, setGender] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password, level, gender });
    };

    return (
        <div className="form-page page">
            <NotSignedIn/>
            <div className="form-box">
                <h2>Create Your Account</h2>
                <p className="subtitle">Join our hostel management system</p>

                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <div className="input-group">
                        <User className="icon" />
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <label>Matric Number</label>
                    <div className="input-group">
                        <IdCard className="icon" />
                        <input
                            type="text"
                            placeholder="FT23CMP00001"
                            value={matric_no}
                            onChange={(e) => setMatricNo(e.target.value)}
                            required
                        />
                    </div>

                    <label>Email</label>
                    <div className="input-group">
                        <GraduationCap className="icon" />
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

                    {/* New row with Level and Gender selects */}
                    <div className="select-group">
                        <div className="select-item">
                            <label>Level</label>
                            <select value={level} onChange={(e) => setLevel(e.target.value)} required>
                                <option value="">Select Level</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                            </select>
                        </div>
                        <div className="select-item">
                            <label>Gender</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="primary-btn signin-btn">Sign in</button>
                </form>
                <div className='row redirect'>
                    <p>Already have an account?</p>
                    <Link to='/login' >login</Link>
                </div>
            </div>
            <GoToTop />
        </div>
    );
}
