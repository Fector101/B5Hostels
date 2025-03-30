import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/js/UserContext";

function PopupRoomCard({
    amenities,
    capacity,
    block,
    room_number,
    status,
    floor,
    occupants,
    i,
}) {
    return (
        <div
            className={
                "student-card room-selection-card free" +
                (i === 0 ? "active" : "")
            }
        >
            <div className="card-header">
                <div className="student-id-box">
                    <p className="dim-text">Room</p>
                    <p className="room_number">{room_number}</p>
                </div>
                <span className="badge hostel">{status}</span>
            </div>
            <div className="info">
                <div className="row">
                    <p className="dim-text">Block:</p>
                    <p>{block}</p>
                </div>
                <div className="row">
                    <p className="dim-text">Capacity:</p>
                    <p>
                        {occupants?.length} /{capacity}
                    </p>
                </div>

                <div className="row">
                    <p className="dim-text">Floor:</p>
                    <p> {floor}</p>
                </div>
            </div>
            <div className="amenities-box">
                <p className="dim-text">Amenities:</p>
                <div className="con">
                    {amenities?.[0]
                        .split(",")
                        .slice(0, 3)
                        .map((amenity) => (
                            <div key={amenity} className="sub-container">
                                <p>{amenity}</p>
                            </div>
                        ))}
                </div>
            </div>

            <div className="btns-box">
                <button className="select-btn">
                    {i === 0 ? "Selected" : "Select Room"}
                </button>
            </div>
        </div>
    );
}
function StudentCard({
    name,
    matric_no,
    email,
    preference,
    level,
    room,
    verified,
}) {
    return (
        <div
            data-level={level}
            className="student-card <%= state %> <%= student.payments &&student.payments.length > 0? ' paid':''%>"
        >
            <div className="card-header">
                <div className="student-id-box">
                    <p className="dim-text">Matric N0</p>
                    <p className="matric_no">{matric_no}</p>
                </div>
                <span className="badge level">{level} LVL</span>
            </div>
            <div className="name-box">
                <div className="avatar">ES</div>
                <div>
                    <h3 className="name">{name}</h3>
                    <p className="email">{email}</p>
                </div>
            </div>
            <div className="info">
                <div className="row">
                    <p className="dim-text">Status:</p>
                    <p>{verified ? "Verified" : "Pending"}</p>
                </div>
                <div className="row">
                    <p className="dim-text">Room:</p>
                    <p>{room}</p>
                </div>

                <div className="row">
                    <p className="dim-text">Preference:</p>
                    <p className="preference">{preference}</p>
                </div>
            </div>
            <div className="btns-box">
                <button className="assign-btn">Assign Room</button>
                <button className="random-room-btn">Random Room</button>
            </div>
        </div>
    );
}
export default function Students() {
    const [rooms, SetRooms] = useState([]);
    const [students, SetStudents] = useState([]);
    const { RoomsData, StudentsData } = useContext(UserContext);

    useEffect(() => {
        SetRooms(RoomsData);
        SetStudents(StudentsData);
    }, [RoomsData, StudentsData]);
    console.log(students);
    return (
        <div className="page adminpage">
            <div id="notification" className="notification"></div>
            <div
                style={{ zIndex: "3" }}
                className="spinner-cover cover display-none"
            >
                <div id="spinner" className="spinner"></div>
            </div>
            <div className="flex cover display-none choices">
                <div className="allocation-box">
                    <button className="close-btn">X</button>
                    <h1>Room Allocation</h1>
                    <p className="header-caption dim-text">
                        Assign a room to <span className="--name">Evelyn</span>{" "}
                        <span className="--matric_no">(FT23CMP0007)</span>
                    </p>
                    <p>Available Rooms (6)</p>
                    <div className="rooms-box">
                        {rooms?.map((room, i) => (
                            <PopupRoomCard
                                amenities={room.amenities}
                                capacity={room.capacity}
                                block={room.block}
                                room_number={room.room_number}
                                status={room.status}
                                floor={room.floor}
                                occupants={room.occupants}
                                key={i}
                                i={i}
                            />
                        ))}
                    </div>

                    <div className="allocation-btns-box">
                        <button id="accept-room" className="ok">
                            Assign Room
                        </button>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>

            <div className="welcome-box">
                <h2>Student Management</h2>
                <p>Verify, reject, and assign rooms to students</p>
            </div>

            <section className="main-content">
                <div className="tabs">
                    <button value="student-card" className="active">
                        All Students
                    </button>
                    <button value="pending">Pending</button>
                    <button value="verified">Verified</button>
                    <button value="paid">Paid</button>
                </div>

                <div className="filters">
                    <input type="text" placeholder="Search students..." />
                    <select className="select-level">
                        <option value="all">All Levels</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                    </select>
                </div>
                <div className="cards-box">
                    {students.map((student, i) => (
                        <StudentCard
                            key={i}
                            verified={student.verified}
                            name={student.name}
                            matric_no={student.matric_no}
                            email={student.email}
                            preference={student.preference}
                            level={student.level}
                            room={student.room}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
