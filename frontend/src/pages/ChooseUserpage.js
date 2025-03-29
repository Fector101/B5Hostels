import { Link } from "react-router-dom";
import '../components/css/choose-userpage.css'
import { Building, User } from "lucide-react";


export default function ChooseUserpage(){
      return(
        <div className="choose-userpage page">
            <Link to='/admin/login' className="choice">
                <Building/>
                Admin
            </Link>
            <Link to='/signup' className="choice">
                <User/>
                User
            </Link>
        </div>

        // To Redirect
        // <Navigate to="/hostel"/>
    )
}