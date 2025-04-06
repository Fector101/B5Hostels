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
    const [roomsDataSummary, setRoomsDataSummary] = useState({
        under_maintenance: 0,
        full_rooms: 0,
        available_rooms: 0,
        total_rooms: 0,
        // total_students_that_have_rooms: 0,
        // total_students: 0,
        // awaiting_approval: 0,
    });
    const [ComplaintsContext, setComplaints] = useState([]);
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
                setUser(data.data); // No need for old values, This is for when page refresh
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
                // setRooms(data.rooms);  // Save user data globally
                setStudents(data.students);  // Save user data globally
                console.log('Successfully Fetched Students data...')
                if (!silent) toast("Successfully Fetched Students Data", { type: "success" });

            } else {
                console.log(' Bad Request Students data...')
                // setStudents([]);
            }
        } catch (error) {
            console.log(error, ' Error Getting user profile data...')
            console.error("Network error:", error);
            // setStudents([]);
        }
    };

    const fetchComplaints = async (silent = false) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/complaints`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                setComplaints(data.complaints);
            } else {
                !silent && toast(data.msg || "Failed to fetch complaints.", { type: "error" });
            }
        } catch (error) {
            !silent && toast("Error fetching complaints: " + error.message, { type: "error" });
        }
    }
    // Fetch user data on mount
    useEffect(() => {
        // console.log(isLoggedIn)
        // if(!isLoggedIn) return
        const socket = io(process.env.REACT_APP_BACKEND_URL, {
            reconnectionAttempts: 5,
            reconnectionDelay: 1000 * 3,
            withCredentials: true
        })
        socket.on("connect", () => {
            console.log("WebSocket Connected");
            socket?.emit("requestRoomsData");
        });

        socket.on("roomsUpdate", (data) => {
            // console.log(data, 'on rooms update')
            if (data?.rooms) {
                setRooms(data.rooms);
                setRoomsDataSummary({ ...data.roomsDataSummary });
            }
        });
        socket.on('userDataUpdate', (data) => {
            console.log('UserData received:', data);
            // We need the old data incase we are not getting all the data and just updating some
            setUser(old_data => ({ ...old_data, ...data }));
            // toast.success(data.msg);
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
        fetchComplaints(true);

        console.log(location.pathname.startsWith('/admin'))
        if (location.pathname.startsWith('/admin')) {
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
                // console.log(res)
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
                roomsDataSummary,
                ComplaintsContext,
                
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
}