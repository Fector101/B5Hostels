import '../components/css/login-signuppage.css';
import GoToTop from "../components/js/GoToTop";
import {useContext, useState } from "react";
import { Lock, IdCard, User, GraduationCap } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import NotSignedIn from '../components/ui/header/NotSignedIn';
import { toast } from 'react-toastify';
import { UserContext } from '../components/js/UserContext';


export default function SignupPage() {
    const navigate = useNavigate()
    const { fetchRoomsData, fetchUserData } = useContext(UserContext);

    const usefiller = process.env.NODE_ENV === 'development'
    console.log(usefiller,process.env.NODE_ENV)
    const [email, setEmail] = useState(usefiller ? "f@gmail.com" : '');
    const [matric_no, setMatricNo] = useState(usefiller ? "FT23CMP00001" : '');
    const [password, setPassword] = useState(usefiller ? "1" : '');
    const [fullname, setFullName] = useState(usefiller ? "Fabian Joseph" : '');
    const [level, setLevel] = useState(usefiller ? 100 : "");
    const [gender, setGender] = useState(usefiller ? 'Male' : "");
    const [signing_in, setSigningIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSigningIn(true)

        const formData = {
            name: fullname,
            email,
            matric_no,
            password,
            gender,
            level
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/authn/signup`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSigningIn(false)
                console.log("User created:", data);
                toast(data.msg || 'Signup successful!', { type: 'success' });
                navigate(data.url);
                await fetchUserData()
                await fetchRoomsData()
                // Redirect or update UI
            } else {
                setSigningIn(false)
                console.error("Signup error:", data);
                toast(data.msg || 'Check your inputs.', { type: 'warning' });
            }
        } catch (error) {
            setSigningIn(false)
            console.error("Network error:", error);
            toast('Something went wrong! ' + error, { type: 'error' });
            // alert("Network error. Please try again.");
        }
    };

    return (
        <div className="form-page page">
            {signing_in &&
                <div className='modal signing-in-spinner-case'>
                    <div id="spinner" className="spinner"></div>
                </div>

            }
            <NotSignedIn />
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

                    <button type="submit" className="primary-btn signin-btn">Sign Up</button>
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
