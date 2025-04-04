import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";

// Create User Context
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userData, setUser] = useState({});
    const [RoomsData, setRooms] = useState([]);
    const [StudentsData, setStudents] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();


    async function CheckLoggedIn(route) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/authn/${route}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                return true
            }
        } catch {
            return false
        }
    }
    const fetchUserData = async (silent = false) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.data);
                setIsLoggedIn(true)
                console.log('Successfully Fetched profile data...')
                if (!silent) toast("Successfully Fetched User Data", { type: "success" })

            } else {
                console.log(' Bad Request user profile data...')
                // setUser({});
            }
        } catch (error) {
            console.log(error, ' Error Getting user profile data...')
            console.error("Network error:", error);
            // setUser({});
        }
    };


    const fetchAdminData = async (silent = false) => {
        try {
            // Change to Only fetch users data, since we already have rooms data
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/all-data`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data.rooms)
                setRooms(data.rooms);  // Save user data globally
                setStudents(data.students);  // Save user data globally
                console.log('Successfully Fetched Rooms data...')
                if (!silent) toast("Successfully Fetched Rooms Data", { type: "success" });

            } else {
                console.log(' Bad Request Rooms data...')
                setRooms([]);
            }
        } catch (error) {
            console.log(error, ' Error Getting user profile data...')
            console.error("Network error:", error);
            setRooms([]);
        }
    };

    // Fetch user data on mount
    useEffect(() => {
        // console.log(isLoggedIn)
        // if(!isLoggedIn) return
        const socket = io(process.env.REACT_APP_BACKEND_URL,{
            reconnectionAttempts:5,
            reconnectionDelay:1000*3,
            withCredentials:true
        })
        socket.on("connect", () => {
            console.log("WebSocket Connected");
            socket?.emit("requestRoomsData");
        });

        socket.on("roomsUpdate", (data) => {
            console.log(data,'on rooms update')
            if(data){
                setRooms(data);
            }
        });

        socket.on("disconnect", (reason) => {
            console.warn("WebSocket Disconnected:", reason);
        });

        return () => {
            socket?.off("roomsUpdate");
            socket.disconnect();
        };
    }, [isLoggedIn]);

    useEffect(() => {
        fetchUserData(true);
        fetchAdminData(true);
        console.log(location.pathname.startsWith('/admin'))
        if(location.pathname.startsWith('/admin')){
            CheckLoggedIn('admin-logged').then(res => {
                console.log(res)
                if (!res) {
                    toast('Login Session Expired', { type: 'warning' });
                    navigate('/login')
                }
            })
        }
        else if (!isLoggedIn && !["/", "/login", '/signup'].includes(location.pathname)) {
            CheckLoggedIn('student-logged').then(res => {
                console.log(res)
                if (!res) {
                    toast('Login Session Expired', { type: 'warning' });
                    navigate('/login')
                }
            })
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                userData,
                RoomsData,
                StudentsData,

                setUser,
                setIsLoggedIn,
                CheckLoggedIn,
                setStudents,
                setRooms,
                fetchAdminData,
                fetchUserData
            }}>
            {children}
        </UserContext.Provider>
    );
};
