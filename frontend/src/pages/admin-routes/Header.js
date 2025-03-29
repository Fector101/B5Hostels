import { Building, Home, LogOut, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const [nav_state, setNavState] = useState(false)

    useEffect(() => {
        function handleResize() {
            setNavState(false)
            const signoutBtn = document.querySelector('.signout-btn')
            const navEle = document.querySelector('header nav')
            // if (window.innerWidth > 800) {
                navEle.classList.remove('show-nav-phone')
                signoutBtn.classList.remove('show-signout-btn')
            // } 
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);



    }, []);

    function toggleNav() {
        const signoutBtn = document.querySelector('.signout-btn')
        const navEle = document.querySelector('header nav')        
        navEle.classList.toggle('show-nav-phone')
        signoutBtn.classList.toggle('show-signout-btn')
        setNavState(old => !old)
    }
    return (
        <header className="admin-header">
            <div className="menu-btn-box">
                <h1>Hostel Manager</h1>
                <button className="menu-btn" onClick={toggleNav}>
                    <svg className={"menu-svg" + (nav_state ? ' display-none' : '')} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lov-id="src/components/Navbar.tsx:62:56" data-lov-name="Menu" data-component-path="src/components/Navbar.tsx" data-component-line="62" data-component-file="Navbar.tsx" data-component-name="Menu" data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
                    <svg className={"x-svg" + (!nav_state ? ' display-none' : '')} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lov-id="src/components/Navbar.tsx:62:28" data-lov-name="X" data-component-path="src/components/Navbar.tsx" data-component-line="62" data-component-file="Navbar.tsx" data-component-name="X" data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </button>
            </div>
            <nav>
                <Link style={{ width: "110px" }}
                    className={location.pathname.endsWith('dashboard') ? 'active' : ''}
                    to="/admin/dashboard"
                >
                    <Home />
                    Dashboard</Link>
                <Link
                    className={location.pathname.endsWith('students') ? 'active' : ''}
                    to="/admin/students"
                >
                    <Users />
                    Students</Link>
                <Link
                    className={location.pathname.endsWith('rooms') ? 'active' : ''}
                    to="/admin/rooms"
                >
                    <Building />
                    Rooms</Link>
            </nav>
            <button className="signout-btn">
                <LogOut />
                <p>Sign Out</p>
            </button>
        </header>

    )
}