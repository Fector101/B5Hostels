import { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { UserContext } from "../../components/js/UserContext";

function RoomCard({
    amenities,
    floor,
    room_number,
    block,
    occupants,
    capacity,
    status,
}) {
    return (
        <div
            className={`student-card room-card ${status} ${block === "New Hostel" ? "new-hostel" : "old-hostel"
                }`}
        >
            <div className="card-header">
                <div className="student-id-box">
                    <p className="dim-text">Room</p>
                    <p>{room_number}</p>
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
                        {occupants.length}/{capacity}
                    </p>
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
    );
}
function AddRoomForm({ setAddingRoom, setSpinner }) {
    const { setRooms, RoomsData } = useContext(UserContext);

    const usefiller = process.env.NODE_ENV === "development";
    const [room_number, setRoomNumber] = useState(usefiller ? 101 : "");
    const [floor, setFloor] = useState(usefiller ? 1 : "");
    const [capacity, setCapacity] = useState(usefiller ? 4 : "");
    const [block, setBlock] = useState("Old Hostel");
    // const [gender, setGender] = useState("male");
    const [status, setStatus] = useState("free");
    const [amenities, setAmenities] = useState(
        usefiller ? "WiFi, Desk, Wardrobe" : ""
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            room_number,
            block,
            floor,
            status,
            // gender,
            capacity,
            amenities
        };
        console.log(formData)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/add-room`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                setSpinner(false)
                const new_room = {
                    "img": "img20.jpg",
                    room_number,
                    block,
                    floor,
                    status,
                    capacity,
                    "amenities": [ amenities ],
                    "occupants": [],
                }
                setRooms([new_room,...RoomsData])
                toast(result.msg || "success", { type: "success" });
            } else {
                setSpinner(false)
                toast(result.msg || "Poor Network, Try Refreshing Page", {
                    type: "warning",
                });
            }
        } catch (error) {
            setSpinner(false)
            console.log("Adding room Error :", error);
            toast(`Something went wrong! ` + error, { type: "error" });
        }
    };
    return (
        <div className="flex form cover modal">
            <div className="add-container">
                <button
                    onClick={() => setAddingRoom(false)}
                    className="close-btn"
                >
                    X
                </button>
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
                            <select
                                value={block}
                                id="block"
                                onChange={(e) => setBlock(e.target.value)}
                            >
                                <option value="Old Hostel">Old Hostel</option>
                                <option value="New Hostel">New Hostel</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid-container">
                        <div className="form-group">
                            <label htmlFor="floor">Floor</label>
                            <input
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                                type="number"
                                id="floor"
                                min="1"
                                max="3"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="capacity">Capacity</label>
                            <input
                                id="capacity"
                                type="number"
                                name="capacity"
                                min="1"
                                max="4"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* <div className="grid-container"> */}
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            value={status}
                            id="status"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="free">Available</option>
                            <option value="full">Occupied</option>
                            <option value="maintenance">
                                Under Maintenance
                            </option>
                        </select>
                    </div>
                    {/* <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                value={gender}
                                id="gender"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                         */}


                    <div className="form-group">
                        <label htmlFor="amenities">Amenities</label>
                        <textarea
                            value={amenities}
                            onChange={(e) => setAmenities(e.target.value)}
                            id="amenities"
                            placeholder="WiFi, Desk, Wardrobe"
                        ></textarea>
                        <small>
                            List amenities separated by commas (e.g., WiFi,
                            Desk, Wardrobe)
                        </small>
                    </div>
                    <button className="primary-btn">Add Room</button>
                </form>
            </div>
        </div>
    );
}
export default function Rooms() {
    const [rooms, SetRooms] = useState([]);

    const [adding_room, setAddingRoom] = useState(false);
    const [spinner, setSpinner] = useState(false);
    // const [search_text, setSearchText] = useState(usefiller ? "111" : '');
    // const [level, setLevel] = useState(usefiller ? 100 : "");
    // const [gender, setGender] = useState(usefiller ? 'Male' : "");
    const { RoomsData } = useContext(UserContext);

    useEffect(() => {
        SetRooms(RoomsData);
    }, [RoomsData]);

    function showTab(tab) {
        // tab = 'maintenance' or 'free' or 'full' or ('room-card' <--- for all)
        document
            .querySelector(".tabs button.active")
            ?.classList.remove("active");
        document
            .querySelector(`.tabs button.${tab}-tab-btn`)
            ?.classList.add("active");

        document.querySelectorAll(".room-card").forEach((card) => {
            if (!card.classList.contains(tab)) {
                card.classList.add("display-none");
            } else {
                card.classList.remove("display-none");
            }
        });
        document.querySelector(".select-hostel").value = "room-card";
        displayHostel("room-card");
    }

    function displayHostel(hostel) {
        // hostel ---> 'room-card' || 'new-hostel || 'old-hostel
        const currentTab = document.querySelector(".tabs button.active").value;
        document
            .querySelectorAll(`.cards-box > div.${currentTab}`)
            .forEach((card) => {
                if (card.classList.contains(hostel)) {
                    card.classList.remove("display-none");
                } else {
                    card.classList.add("display-none");
                }
            });
    }

    return (
        <div className="page adminpage">
            {
                spinner &&
                <div style={{ zIndex: "3", display: 'block' }} className="spinner-cover cover modal" >
                    <div id="spinner" className="spinner"></div>
                </div>
            }

            {adding_room && (
                <AddRoomForm
                    setSpinner={setSpinner}
                    setAddingRoom={setAddingRoom}
                />
            )}
            <div className="welcome-box rooms-welcome-box">
                <div>
                    <h2>Room Management</h2>
                    <p>View and manage all hostel rooms</p>
                </div>
                <button
                    onClick={() => setAddingRoom(true)}
                    className="add-room-btn primary-btn"
                >
                    <Plus />
                    Add Room
                </button>
            </div>
            <section className="main-content">
                <div className="tabs">
                    <button
                        onClick={(e) => showTab(e.target.value)}
                        className="room-card-tab-btn active"
                        value="room-card"
                    >
                        All Rooms
                    </button>
                    <button
                        onClick={(e) => showTab(e.target.value)}
                        className="free-tab-btn "
                        value="free"
                    >
                        Available
                    </button>
                    <button
                        onClick={(e) => showTab(e.target.value)}
                        className="full-tab-btn "
                        value="full"
                    >
                        Occupied
                    </button>
                    <button
                        onClick={(e) => showTab(e.target.value)}
                        className="maintenance-tab-btn "
                        value="maintenance"
                    >
                        Maintenance
                    </button>
                </div>

                <div className="filters">
                    {/* <input type="text" value={search_text} onChange={(e) => setSearchText(e.target.value)} placeholder="Search rooms..." /> */}
                    <select
                        onChange={(e) => displayHostel(e.target.value)}
                        className="select-hostel"
                    >
                        <option value="room-card">All Blocks</option>
                        <option value="new-hostel">New Hostel</option>
                        <option value="old-hostel">Old Hostel</option>
                    </select>
                </div>

                <div className="cards-box">
                    {rooms.map((room, i) => (
                        <RoomCard
                            key={i}
                            amenities={room.amenities}
                            capacity={room.capacity}
                            block={room.block}
                            room_number={room.room_number}
                            status={room.status}
                            floor={room.floor}
                            occupants={room.occupants}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
