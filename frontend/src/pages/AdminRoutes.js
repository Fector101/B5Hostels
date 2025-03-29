import { Link, Route, Routes } from "react-router-dom";
import Loginpage from "./admin-routes/Loginpage";

export default function AdminRoutes({text}){
    return (
        <Routes>
            <Route>
                {/* <Route index  element={ <Listspage text='Frm App Component to Route'/> } />
                <Route path=":list_name" element={ <Listpage text='Frm App Component to Route'/> }/> */}
                <Route path="login" element={ <Loginpage text='Frm App Component to Route'/> }/>
            </Route>
        </Routes >
        // <>
        //     <p>{text}</p>
        //     {/* 'replace' Keyword means we're Removing current page from links visted (i.e We can't come back to the page with the link about to be clicked)
        //     <Link to="/lists/movie1" replace>List 1</Link> */}
        //     <Link to="/admin/login">List 1</Link>
        //     {/* <Link to="/lists/movie2">List 2</Link>
        //     <Link to="/lists/Testing Space and caps"> Testing Space and caps </Link>
        //     <Link to="/lists/new-list">Create Movie</Link> */}
        // </>
    )
}