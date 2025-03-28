import { React } from "react";
import "./header.css"
// import "./header-responsive.css"
import {
    ChevronRight,
    Vote,
    LayoutDashboard,
    ChartNoAxesColumn,
    History,
    User,
    LogOut,
    House,
    Bell,
    Bed,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Header({ className, userName }) {
    // userName='Dev'
    const location = useLocation();
    return (
        <>
            <header className="not-signed-header header">
                <div className="row">
                    <Bed />
                    <Link className="brand" to='/'>B5 Homes</Link>
                </div>
                <section className='nav'>
                    <Link > <House /> Rooms </Link>
                    <Link > <User /> Profile </Link>
                    <Link > <Bell /> </Link>
                </section>
                <button class="menu-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-svg" data-lov-id="src/components/Navbar.tsx:62:56" data-lov-name="Menu" data-component-path="src/components/Navbar.tsx" data-component-line="62" data-component-file="Navbar.tsx" data-component-name="Menu" data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
                    <svg className="display-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="x-svg display-none" data-lov-id="src/components/Navbar.tsx:62:28" data-lov-name="X" data-component-path="src/components/Navbar.tsx" data-component-line="62" data-component-file="Navbar.tsx" data-component-name="X" data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </button>
            </header>
        </>
    );
}
