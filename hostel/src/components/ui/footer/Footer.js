import { Link } from "react-router-dom";
// import ImgwithPL from "./../../js/ImgwithPL";
import './footer.css'
// import logo_src from "../../imgs/logo.png"
import { toTitleCase } from "../../js/helper";
function Row({header,links,className}){
    

    return(
        <div className={className}>
            <p>{header}</p>
            {
                links.map(({url,name_})=>{
                    let link_name = toTitleCase(name_ || url)
                    
                    return <Link key={link_name} to={url}>{link_name}</Link>
                })
            }
        </div>
    )
}
export default function Footer(){
    return(
        <footer className="footer flex">
            {/* <img className="logo" src={logo_src} alt="logo" /> */}
            <Link className="heading" to='/' >B5 Homes</Link>
            <div className="row">

            <Link to='/'>About Us</Link>
            <Link to='/'>Privacy</Link>
            <Link to='/'>Contact Us</Link>
            </div>
            <p className="caption">© 2025 B5 Homes. All rights reserved</p>
        </footer>
    )
}