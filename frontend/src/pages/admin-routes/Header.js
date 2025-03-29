import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <header>
            <div className="menu-btn-box">
                <h1>Hostel Manager</h1>
                <button className="menu-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="menu-svg" data-lov-id="src/components/Navbar.tsx:62:56" data-lov-name="Menu" data-component-path="src/components/Navbar.tsx" data-component-line="62" data-component-file="Navbar.tsx" data-component-name="Menu" data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="x-svg display-none" data-lov-id="src/components/Navbar.tsx:62:28" data-lov-name="X" data-component-path="src/components/Navbar.tsx" data-component-line="62" data-component-file="Navbar.tsx" data-component-name="X" data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </button>
            </div>
            <nav>
                <Link style={{width: "109px"}}
                    className={location.pathname.endsWith('dashboard') ? 'active' : ''}
                    href="/admin/dashboard"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-4 w-4 mr-2" data-lov-id="src/components/Navbar.tsx:16:52" data-lov-name="Home" data-component-path="src/components/Navbar.tsx" data-component-line="16" data-component-file="Navbar.tsx" data-component-name="Home" data-component-content="%7B%22className%22%3A%22h-4%20w-4%20mr-2%22%7D"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                    Dashboard</Link>
                <Link
                    className={location.pathname.endsWith('students') ? 'active' : ''}
                    
                    href="/admin/students"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4 mr-2" data-lov-id="src/components/Navbar.tsx:17:50" data-lov-name="Users" data-component-path="src/components/Navbar.tsx" data-component-line="17" data-component-file="Navbar.tsx" data-component-name="Users" data-component-content="%7B%22className%22%3A%22h-4%20w-4%20mr-2%22%7D"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Students</Link>
                <Link
                    className={location.pathname.endsWith('rooms') ? 'active' : ''}
                    href="/admin/rooms"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building h-4 w-4 mr-2" data-lov-id="src/components/Navbar.tsx:18:44" data-lov-name="Building" data-component-path="src/components/Navbar.tsx" data-component-line="18" data-component-file="Navbar.tsx" data-component-name="Building" data-component-content="%7B%22className%22%3A%22h-4%20w-4%20mr-2%22%7D"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
                    Rooms</Link>
            </nav>
            <button className="signout-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out h-4 w-4 mr-2" data-lov-id="src/components/Navbar.tsx:55:14" data-lov-name="LogOut" data-component-path="src/components/Navbar.tsx" data-component-line="55" data-component-file="Navbar.tsx" data-component-name="LogOut" data-component-content="%7B%22className%22%3A%22h-4%20w-4%20mr-2%22%7D"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                <p>Sign Out</p>
            </button>
        </header>

    )
}