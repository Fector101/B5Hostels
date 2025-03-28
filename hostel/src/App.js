// import { useEffect, useRef, useState } from "react";
// import "./components/css/quick-style.css"
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
import Pollspage from "./pages/Pollspage";
import Historypage from "./pages/Historypage";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Loginpage from "./pages/Loginpage";
import Landingpage from "./pages/Landingpage";
import Adminpanelpage from "./pages/Adminpanelpage";
import SignupPage from "./pages/Signuppage";
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

    useEffect(
        function () {
            setBtnState(["/", "/login"].includes(location.pathname));

            setHeaderState(false);
        },
        [location]
    );

    const [header_state, setHeaderState] = useState(window.innerWidth > 500);
    const [btn_state, setBtnState] = useState(window.innerWidth > 500);

    function toggleHeader() {
        setHeaderState((prev) => !prev);
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 800) {
                setHeaderState(true);
            } else {
                setHeaderState(false);
            }
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {!["/", "/login",'/signup'].includes(location.pathname) &&  <Header className={`sidebar ${header_state ? "show" : "hide"}`} />}
            <Routes>
                {/* <Route path="/signup" element={ <SignupPage /> }/> */}
                {/* <Route path="/login" element={ <LoginPage /> }/> */}
                <Route path="/" element={<Landingpage />} />
                <Route path="/admin" element={<Adminpanelpage />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                    path="/home"
                    element={<Homepage top_movies_data__={top_movies_data} />}
                />
                <Route path="/polls" element={<Pollspage />} />
                <Route path="/history" element={<Historypage />} />
                {/*
        <Route path="/forgot-ps" element={ <ForgotPSPage /> }/>
        <Route path="/list/*" element={<ListRoutes />} /> 
        */}
                <Route
                    path="*"
                    element={
                        <NotFoundpage redirect_path="/" timeout_secs={5} />
                    }
                />
            </Routes>
            {btn_state && (
                <button
                    className="primary-btn"
                    id="menu-btn"
                    onClick={toggleHeader}
                >
                    {header_state ? <X /> : <Menu />}
                </button>
            )}
            <Footer/>
        </>
        // <div className="App">
        // <Homepage top_movies_data__={top_movies_data}/>
        // {/* <Homepage top_movies_data__={top_10_movies.results?.slice(0,7)}/> */}
        // </div>
    );
}

export default App;
