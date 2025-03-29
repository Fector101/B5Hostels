import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

// Parent Less specfic styles should be before main component style
import "./components/css/quick-style.css"
import "./components/css/App.css";

import AdminRoutes from "./pages/AdminRoutes";

import Header from "./components/ui/header/Header";
import Footer from "./components/ui/footer/Footer";

import NotFoundpage from "./pages/NotFoundpage";
import Roomspage from "./pages/Roomspage";
import Loginpage from "./pages/Loginpage";
import Landingpage from "./pages/Landingpage";
import SignupPage from "./pages/Signuppage";
import Profilepage from "./pages/Profilepage";
import RoomDetailsPage from "./pages/RoomDetailsPage";
import ChooseUserpage from "./pages/ChooseUserpage";

function App() {
    const location = useLocation();

    return (
        <>
            {!["/", "/login", '/signup'].includes(location.pathname) && !location.pathname.startsWith('/admin') && <Header />}
            <ToastContainer />

            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<Profilepage />} />
                <Route path="/choose-user" element={<ChooseUserpage />} />
                <Route path="/room" element={<RoomDetailsPage />} />
                <Route path="/rooms" element={<Roomspage />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="*" element={<NotFoundpage redirect_path="/" timeout_secs={5 * 1000} />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
