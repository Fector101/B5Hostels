import { useState, React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css"
// import "./header-responsive.css"
import {
    Search,
    User2,
    ChevronDown,
    BellIcon,
    Menu,
    HomeIcon,
    Bookmark,
    Tv,
    Activity,
    Film,
    ChevronRight,
    XCircle,
    Vote,
    LayoutDashboard,
    ChartNoAxesColumn,
    History,
    User,
    LogOut,
} from "lucide-react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import LoginForm from "../login-signup/LoginForm";
import SignupForm from "../login-signup/SignupForm";
import { disableScroll, enableScroll } from "../../js/helper";
import useCarouselStore from "../carousel/useCarouselStore";


export default function Header({ className, userName }) {
    // userName='Dev'
    const location = useLocation();
    const navItems = [
        {
            icon: <LayoutDashboard />,
            title: "Dashboard",
            link: "/home"
        },
        {
            icon: <Vote />,
            title: "Active Polls",
            link: "/polls"
        },
        {
            icon: <ChartNoAxesColumn />,
            title: "Results",
            link: "/results"
        },
        {
            icon: <History />,
            title: "Past Polls",
            link: "/history"
        },
        {
            icon: <User />,
            title: "Admin Panel",
            link: "/admin"
        }
    ]
    return (
        <>
            <header className={className}>
                <section className="row heading">
                    <Vote />
                    <Link className="title" to='/' >E3Voting</Link>
                </section>
                <section className='nav'>
                    {navItems.map((each, i) => <Link to={each.link} className={`row ${location.pathname === each.link ? "active" : ""}`}> {each.icon} {each.title} <ChevronRight className="arrow" /></Link>)
                    }
                </section>
                <section className='last-box'>
                    <div className='row'>
                        <p>A</p>
                        <div>
                            <p>Admin User</p>
                            <p>Admin</p>
                        </div>
                    </div>
                    <button><LogOut /> Sign Out</button>
                </section>
            </header>

            <Outlet
                context={{
                    foxxy: () => "Wisdow Seekers",
                    user_name: "Fabian - UserName From HeaderSticky",
                }}
            />
        </>
    );
}
