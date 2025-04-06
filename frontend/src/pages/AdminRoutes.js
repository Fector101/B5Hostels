import { useLocation, Route, Routes } from "react-router-dom";
import Header from "./admin-routes/Header";
import Loginpage from "./admin-routes/Loginpage";
import Dashboard from "./admin-routes/Dashboard";
import Students from "./admin-routes/Students";
import Rooms from "./admin-routes/Rooms";
import '../components/css/admin.css'
import { EachStudentPage } from "./admin-routes/EachStudentPage";

export default function AdminRoutes({ text }) {
    const location = useLocation();

    return (
        <>
            {!["/admin/login"].includes(location.pathname) && <Header /> }
            <Routes>
                <Route>
                    <Route path="rooms" element={<Rooms/>} />
                    <Route path="students" element={<Students/>} />
                    <Route path="dashboard" element={<Dashboard/>} />
                    <Route path="login" element={<Loginpage/>} />
                    <Route path="student-docs" element={<EachStudentPage/>} />
                </Route>
            </Routes >
        </>
    )
}