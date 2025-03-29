import { createContext, useState, useEffect } from "react";

// Create User Context
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userData, setUser] = useState({});

    // Function to fetch user data
    const fetchUserData = async () => {
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
            } else {
                console.log(' Bad Request user profile data...')
                setUser({});
            }
        } catch (error) {
            console.log(error,' Error Getting user profile data...')
            console.error("Network error:", error);
            setUser({});
        }
    };

    // Fetch user data on mount
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
