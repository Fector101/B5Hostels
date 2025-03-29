// import { useEffect, useRef, useState } from "react";
import "./components/css/quick-style.css"
import "./components/css/App.css";
import Homepage from "./pages/Homepage";
import { top_movies_data } from "./components/js/api_data";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFoundpage from "./pages/NotFoundpage";
// import ListRoutes from "./pages/LIstRoutes";
import Header from "./components/ui/header/Header";
// import "./components/css/responsive.css"
import Footer from "./components/ui/footer/Footer";
// import Moviepage from "./pages/stuff/Moviepage";
import Roomspage from "./pages/Roomspage";
// import Historypage from "./pages/Historypage";
import { useEffect, useState } from "react";
import Loginpage from "./pages/Loginpage";
import Landingpage from "./pages/Landingpage";
// import Adminpanelpage from "./pages/Adminpanelpage";
import SignupPage from "./pages/Signuppage";
import Profilepage from "./pages/Profilepage";
import { ToastContainer } from 'react-toastify';
import RoomDetailsPage from "./pages/RoomDetailsPage";
import ChooseUserpage from "./pages/ChooseUserpage";
import AdminRoutes from "./pages/AdminRoutes";
// import SignupPage from "./pages/Signuppage";
// import LoginPage from "./pages/Loginpage";
// import ForgotPSPage from "./pages/ForgotPSpage";

// async function apiCall(){
//   const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: process.env.REACT_APP_TEST
//     }
//   };

//   const res = await fetch(url, options)
//   const data = await res.json()
//   return data
// }
// /site-collection/
function App() {
    const location = useLocation();
    const [header_state, setHeaderState] = useState(window.innerWidth > 500);
    // const [btn_state, setBtnState] = useState(window.innerWidth > 500);
   
    useEffect(
        function () {
            // setBtnState(["/", "/login"].includes(location.pathname));

            setHeaderState(false);
        },
        [location]
    );


    // function toggleHeader() {
    //     setHeaderState((prev) => !prev);
    // }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 800) {
                // setHeaderState(true);
            } else {
                // setHeaderState(false);
            }
        }

        window.addEventListener("resize", handleResize);
        // return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {!["/", "/login", '/signup',"/admin/login"].includes(location.pathname) && <Header />}
            <ToastContainer />

            <Routes>
                {/* <Route path="/signup" element={ <SignupPage /> }/> */}
                {/* <Route path="/login" element={ <LoginPage /> }/> */}
                <Route path="/" element={<Landingpage />} />
                {/* <Route path="/admin" element={<Adminpanelpage />} /> */}
                <Route path="/login" element={<Loginpage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<Profilepage />} />
                <Route path="/choose-user" element={<ChooseUserpage />} />
                <Route path="/home" element={<Homepage top_movies_data__={top_movies_data} />}/>
                <Route path="/room" element={<RoomDetailsPage/>} />
                <Route path="/rooms" element={<Roomspage />} />
                <Route path="/admin/*" element={<AdminRoutes />} /> 
                {/*
        <Route path="/forgot-ps" element={ <ForgotPSPage /> }/>
        */}
                <Route
                    path="*"
                    element={
                        <NotFoundpage redirect_path="/" timeout_secs={5 * 1000} />
                    }
                />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
