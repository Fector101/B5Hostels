import { useNavigate } from "react-router-dom";
import GoToTop from "../components/js/GoToTop";
import '../components/css/roomspage.css';
import { Building, Users } from "lucide-react";
import { UserContext } from '../components/js/UserContext';
import { useContext } from "react";

function RoomCard({ status, img, room_number, block, capacity, floor, occupants }) {
    const navigate = useNavigate()
    const goToRoom = () => {
        navigate(`/room?id=${room_number}`);
    };
    // useEffect(() => {
    //     const timeout_secs = 5
    //     const timeout = setTimeout(() => {
    //         navigate('/login')
    //     }, 1000 * timeout_secs)
    //     return () => { clearTimeout(timeout); }

    // }, []);
    return (
        // {
        status ?

            <div className="room-card">
                < div className="room-img" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/imgs/${img})` }} >

                    <div className="badge free">Available</div>
                </div >
                <div className="room-info">
                    <h3>Room: {room_number}</h3>
                    <div className="row spread">
                        <p><Building /> Block:</p>
                        <p>{block}</p>
                    </div>
                    <div className="row spread">
                        <p><Users /> Capacity:</p>
                        <p>{occupants?.length}/{capacity}</p>
                    </div>
                    <div className="row spread">
                        <p>Floor:</p>
                        <p>{floor}</p>
                    </div>
                    <button className="primary-btn" onClick={goToRoom}>View</button>
                </div>
            </div >
            : <></>
        // }

    );
}

export default function Roomspage() {
    const { RoomsData } = useContext(UserContext);
    // console.log('RoomsData ', RoomsData)
    return (
        <div className="rooms-page page">
            {RoomsData.length === 0 &&
                <div className='modal'>
                    <div id="spinner" className="spinner"></div>
                </div>

            }
            <section className="heading">
                <div>
                    <h1>Browse Rooms</h1>
                    <p className="caption">Find a comfortable space for your stay</p>
                </div>
            </section>

            <section className="rooms-box">
                {RoomsData.map(room => (
                    <RoomCard key={room.room_number} {...room} />
                ))}
            </section>

            <GoToTop />
        </div>
    );
}
