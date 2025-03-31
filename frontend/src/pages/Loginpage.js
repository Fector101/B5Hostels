import { useContext, useState } from "react";
import { Lock, Bed, GraduationCap } from "lucide-react";

import '../components/css/login-signuppage.css'
import GoToTop from "../components/js/GoToTop";
import { Link, useNavigate } from "react-router-dom";
import NotSignedIn from "../components/ui/header/NotSignedIn";
import { toast } from 'react-toastify';
import { UserContext } from '../components/js/UserContext';

export default function Loginpage() {
    const navigate = useNavigate()
    const { fetchRoomsData, fetchUserData } = useContext(UserContext);

    const usefiller = process.env.NODE_ENV === 'development'
    const [matric_no, setMatricNo] = useState(usefiller ? 'FT23CMP00001' : "");
    const [password, setPassword] = useState(usefiller ? '1' : "");
    const [signing_in, setSigningIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSigningIn(true)
        try {

            const formData = {
                matric_no,
                password,
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/authn/login`, {
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
                toast(data.msg || 'Login successful!', { type: 'success' });
                navigate(data.url);
                await fetchUserData()
                await fetchRoomsData()
            } else {
                setSigningIn(false)
                console.error("Login error:", data);
                toast(data.msg || 'Check your inputs.', { type: 'warning' });
            }
        } catch (error) {
            setSigningIn(false)
            console.error("Catch Login failed error:", error);
            toast('Something went wrong! ' + error, { type: 'error' });
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
                <div className="icon-circle">
                    <Bed />
                </div>
                <h2>Welcome Back</h2>
                <p className="subtitle">Login to manage your hostel account</p>
                <form onSubmit={handleSubmit}>
                    <label>Matric Number</label>
                    <div className="input-group">
                        <GraduationCap className="icon" />
                        <input
                            type="text"
                            placeholder="FT23CMP0001"
                            value={matric_no}
                            onChange={(e) => setMatricNo(e.target.value)}
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
