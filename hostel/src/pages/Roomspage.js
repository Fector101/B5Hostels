import { Link, useNavigate } from "react-router-dom";
import GoToTop from "../components/js/GoToTop";
import './../components/css/roomspage.css';
import { Building, Users } from "lucide-react";

function RoomCard({ amenities, room_number, building, capacity, floor, occupants }) {
    const navigate = useNavigate()
    const goToRoom = () => {
      navigate(`/room?id=${room_number}`);
    };

    return (
        <div className="room-card">
            <div className="room-img">
            <div className="badge free">Available</div>
                {/* You can add an image here */}
            </div>
            <div className="room-info">
                <h3>Room: {room_number}</h3>
                <div className="row spread">
                    <p><Building /> Block:</p>
                    <p>{building}</p>
                </div>
                <div className="row spread">
                    <p><Users /> Capacity:</p>
                    <p>{occupants}/{capacity}</p>
                </div>
                <div className="row spread">
                    <p>Floor:</p>
                    <p>{floor}</p>
                </div>
                <button className="primary-btn" onClick={goToRoom}>View</button>
            </div>
        </div>
    );
}

export default function Roomspage({rooms_data}) {
    
    return (
        <div className="rooms-page page">
            <section className="heading">
                <div>
                    <h1>Browse Rooms</h1>
                    <p className="caption">Find a comfortable space for your stay</p>
                </div>
            </section>

            <section className="rooms-box">
                {rooms_data.map(room => (
                    <RoomCard key={room.room_number} {...room} />
                ))}
            </section>

            <GoToTop />
        </div>
    );
}
