import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/js/UserContext";

function RoomCard({ amenities, floor, room_number, block, occupants, capacity, status }) {
    return (
        <div className={`student-card room-card ${status} ${block === 'New Hostel' ? 'new-hostel' : 'old-hostel'}`}>
            <div className="card-header">
                <div className="student-id-box">
                    <p className="dim-text">Room</p>
                    <p>{room_number}</p>
                </div>
                <span className="badge hostel">status</span>
            </div>
            <div className="info">
                <div className="row">
                    <p className="dim-text">Block:</p>
                    <p>{block}</p>
                </div>
                <div className="row">
                    <p className="dim-text">Capacity:</p>
                    <p>{occupants.length}/{capacity}</p>
                </div>

                <div className="row">
                    <p className="dim-text">Floor:</p>
                    <p>{floor}</p>
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
        </div>
    )
}

export default function Rooms() {
    const [rooms, SetRooms] = useState([])
    const usefiller = process.env.NODE_ENV === 'dev'
    const [room_number, setRoomNumber] = useState(usefiller ? 101 : '');
    const [floor, setFloor] = useState(usefiller ? 1 : '');
    const [capacity, setCapacity] = useState(usefiller ? 4 : '');
    // const [search_text, setSearchText] = useState(usefiller ? "111" : '');
    // const [level, setLevel] = useState(usefiller ? 100 : "");
    // const [gender, setGender] = useState(usefiller ? 'Male' : "");
    const { RoomsData } = useContext(UserContext);


    useEffect(() => {
        SetRooms(RoomsData);
    }, [RoomsData]);

    function showTab(tab) {
        // tab = 'maintenance' or 'free' or 'full' or ('room-card' <--- for all)
        document.querySelector(".tabs button.active")?.classList.remove("active");
        document.querySelector(`.tabs button.${tab}-tab-btn`)?.classList.add("active");


        document.querySelectorAll('.room-card').forEach(card => {
            if (!card.classList.contains(tab)) {
                card.classList.add('display-none')
            } else {
                card.classList.remove('display-none')
            }
        })
        // const currentHostel = document.querySelector('.select-hostel').value
        // displayHostel(currentHostel)
        document.querySelector('.select-hostel').value = 'room-card'
        displayHostel('room-card')
    }

    function displayHostel(hostel) {
        // hostel ---> 'room-card' || 'new-hostel || 'old-hostel
        const currentTab = document.querySelector('.tabs button.active').value
        document.querySelectorAll(`.cards-box > div.${currentTab}`).forEach(card => {
            if (card.classList.contains(hostel)) {
                card.classList.remove('display-none')
            } else {
                card.classList.add('display-none')
            }
        })
    }

    const handleSubmit = async (e) => {

    }


    return (
        <div className='page adminpage'>

            <div style={{ zIndex: "3" }} className="spinner-cover cover display-none">
                <div id="spinner" className="spinner"></div>
            </div>

            <div className="flex form cover display-none">
                <div className="add-container">
                    <button className="close-btn">X</button>
                    <h3>Add New Room</h3>
                    <p className="header-sub dim-text">
                        Fill in the details to add a new room to the hostel.
                    </p>
                    <form onSubmit={handleSubmit} id="add-room-form">
                        <div className="grid-container">
                            <div className="form-group">
                                <label htmlFor="room-number">Room Number</label>
                                <input
                                    value={room_number}
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                    type="number"
                                    min="1"
                                    id="room-number"
                                    placeholder="e.g., 101"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="block">Block</label>

                                <select id="block">
                                    <option>Old Hostel</option>
                                    <option>New Hostel</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid-container">
                            <div className="form-group">
                                <label htmlFor="floor">Floor</label>
                                <input

                                    value={floor}
                                    onChange={(e) => setFloor(e.target.value)}
                                    type="number" id="floor" min="1" max="3" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="capacity">Capacity</label>
                                <input
                                    id='capacity'
                                    type="number"
                                    name="capacity"
                                    min="1"
                                    max="4"

                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select id="status">
                                <option value="free">Available</option>
                                <option value="full">Occupied</option>
                                <option value="maintenance">Under Maintenance</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="amenities">Amenities</label>
                            <textarea
                                id="amenities"
                                placeholder="WiFi, Desk, Wardrobe"
                            ></textarea>
                            <small
                            >List amenities separated by commas (e.g., WiFi,
                                Desk, Wardrobe)</small
                            >
                        </div>
                        <button className="primary-btn">Add Room</button>
                    </form>
                </div>
            </div>
            <div className="welcome-box rooms-welcome-box">
                <div>
                    <h2>Room Management</h2>
                    <p>View and manage all hostel rooms</p>
                </div>
                <button className="add-room-btn primary-btn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-plus mr-2 h-4 w-4"
                        data-lov-id="src/components/AddRoomForm.tsx:80:10"
                        data-lov-name="Plus"
                        data-component-path="src/components/AddRoomForm.tsx"
                        data-component-line="80"
                        data-component-file="AddRoomForm.tsx"
                        data-component-name="Plus"
                        data-component-content="%7B%22className%22%3A%22mr-2%20h-4%20w-4%22%7D"
                    >
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                    </svg>
                    Add Room
                </button>
            </div>
            <section className="main-content">
                <div className="tabs">
                    <button onClick={(e) => showTab(e.target.value)} className="room-card-tab-btn active" value="room-card">All Rooms</button>
                    <button onClick={(e) => showTab(e.target.value)} className="free-tab-btn " value="free">Available</button>
                    <button onClick={(e) => showTab(e.target.value)} className="full-tab-btn " value="full">Occupied</button>
                    <button onClick={(e) => showTab(e.target.value)} className="maintenance-tab-btn " value="maintenance">Maintenance</button>
                </div>

                <div className="filters">
                    {/* <input type="text" value={search_text} onChange={(e) => setSearchText(e.target.value)} placeholder="Search rooms..." /> */}
                    <select onChange={(e) => displayHostel(e.target.value)} className="select-hostel">
                        <option value="room-card">All Blocks</option>
                        <option value="new-hostel">New Hostel</option>
                        <option value="old-hostel">Old Hostel</option>
                    </select>
                </div>

                <div className="cards-box">
                    {rooms.map((room, i) => <RoomCard
                        key={i}
                        amenities={room.amenities}
                        capacity={room.capacity}
                        block={room.block}
                        room_number={room.room_number}
                        status={room.status}
                        floor={room.floor}
                        occupants={room.occupants}
                    />)}
                </div>

            </section>
        </div>
    )
}