import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Create User Context
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userData, setUser] = useState({});
    const [RoomsData, setRooms] = useState([]);
    const [StudentsData, setStudents] = useState([]);

    // Function to fetch user data

    const fetchUserData = async (silent=false) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.data);  // Save user data globally
                console.log('Getting user profile data...')
                if(!silent)toast("Successfully Fetched User Data", { type: "success" })

            } else {
                console.log(' Bad Request user profile data...')
                setUser({});
            }
        } catch (error) {
            console.log(error, ' Error Getting user profile data...')
            console.error("Network error:", error);
            setUser({});
        }
    };

    const fetchRoomsData = async (silent=false) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rooms`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (response.ok) {
                setRooms(data.data);  // Save user data globally
                console.log('Getting Rooms data...')
                if(!silent)toast("Successfully Fetched Rooms Data", { type: "success" });

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

    const fetchAdminData = async (silent=false) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/all-data`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (response.ok) {
                setRooms(data.rooms);  // Save user data globally
                setStudents(data.students);  // Save user data globally
                console.log('Getting Rooms data...')
                if(!silent)toast("Successfully Fetched Rooms Data", { type: "success" });

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
        fetchUserData(true);
        fetchRoomsData(true);
        fetchAdminData(true);
    }, []);

    return (
        <UserContext.Provider value={{ userData, RoomsData,StudentsData, fetchAdminData,fetchRoomsData, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};
