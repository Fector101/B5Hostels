import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/js/UserContext";
import { toast } from "react-toastify";
import { getInitials } from "../../components/js/helper";
import { FileTextIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function PopupRoomCard({ selected_room, setSelectedRoom, amenities, capacity, block, room_number, status, floor, occupants, i }) {
    function setCard(event) {
        const selected_card = event.target.closest('.student-card')
        if (!selected_card) return
        document.querySelector('div.student-card.active')?.classList.remove('active')
        selected_card.classList.add('active')
        const room_number = selected_card.querySelector('.room_number').innerText
        setSelectedRoom(room_number)
    }
    return (
        <div onClick={setCard}
            className={
                "student-card room-selection-card free" +
                (room_number === selected_room ? " active" : "")
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
function StudentCard({ name, pdfs_length, profile_pic, matric_no, email, preference, level, room, status, payments, setMatricNo, setStudentName, assignRoom, setChoicesModal }) {
    // let state = 'all-students pending-verification-account verified-account paid'
    // pending verified paid
    // not verfing payment but student account
    let [status__, setStatus__] = useState(() => status)
    let [room__, setRoom__] = useState(() => room)
    const { setStudents, StudentsData } = useContext(UserContext);
    // const navigate = useNavigate()

    useEffect(() => {
        setStatus__(status)
    }, [status]);

    useEffect(() => {
        setRoom__(room)
    }, [room]);

    async function updateStatus(matric_no, status) {
        try {
            const student_data = { matric_no, status };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/update-student-status`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(student_data),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Successful Student Verification:", data);
                let found_student_data;
                const student_index = StudentsData.findIndex(student => {
                    if (student.matric_no === matric_no) {
                        found_student_data = student
                        found_student_data.status = status
                        return true
                    } else { return false }
                })
                StudentsData[student_index] = found_student_data
                setStudents(StudentsData)
                setStatus__(status)
                toast(data.msg || 'Verified successful!', { type: 'success' });
            } else {
                console.error("Verification error:", data);
                toast(data.msg || 'Check your inputs.', { type: 'warning' });
            }
        } catch (error) {
            console.error("Caught Verification error:", error);
            toast('Something went wrong! ' + error, { type: 'error' });
        }
    };

    function Btns({ status, room, payments_length }) {

        if (status === 'pending') {
            // if (!verified) {
            return <>
                <button onClick={() => updateStatus(matric_no, 'verified')} className="primary-btn verify-btn">Verify</button>
                {/* <button className="view-info-btn"> View Docs </button> */}
                <button onClick={() => updateStatus(matric_no, 'rejected')} className="red-color reject-room-btn"> Reject </button>
            </>

        }
        // else if (status === 'rejected') {
        //     return <button disabled className="assigned-room-btn"> Delet </button>
        // }
        else if (!room && payments_length > 0) {
            return <>
                <button onClick={() => { setStudentName(name); setMatricNo(matric_no); setChoicesModal(true) }} className="assign-btn">Assign Room</button>
                <button onClick={() => { assignRoom(matric_no) }} className="random-room-btn">Random Room</button>
            </>
        } else if (room) {
            return <button disabled className="assigned-room-btn"> Room Assigned </button>
        } else {
            return <button disabled className="assigned-room-btn"> No Payment Made</button>
        }
    }
    return (
        <div
            data-level={level}
            className={"student-card " + status__ + (payments.length > 0 ? ' paid' : '')}
        >
            <div className="card-header">
                <div className="student-id-box">
                    <p className="dim-text">Matric N0</p>
                    <p className="matric_no">{matric_no}</p>
                </div>
                <span className="badge level">{level} LVL</span>
            </div>
            <div className="name-box">
                <div className="avatar">
                    {profile_pic ? <img src={profile_pic} alt="profile" /> :
                        <p>{getInitials(name)}</p>}
                </div>
                <div>
                    <h3 className="name">{name}</h3>
                    <p className="email">{email}</p>
                </div>
            </div>
            <div className="info flex">
                <div className="flex-spread">
                    <div className="row">
                        <p className="dim-text">Status:</p>
                        <p>{status__}</p>
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
                <Link className="view-pdfs-btn" to={'/admin/student-docs?id=' + matric_no}>
                    <p>{pdfs_length}</p>
                    <FileTextIcon />
                </Link>
            </div>
            <div className="btns-box">
                <Btns status={status__} room={room__} payments_length={payments?.length} />
            </div>
        </div>
    );
}
export default function Students() {
    const { RoomsData, StudentsData, setStudents } = useContext(UserContext);

    // const [rooms, SetRooms] = useState([]);
    const [students, SetStudents] = useState([]);
    const [choices_modal, setChoicesModal] = useState(false);
    const [matric_no, setMatricNo] = useState('');
    const [student_name, setStudentName] = useState('');
    const [selected_room, setSelectedRoom] = useState('');
    const [available_rooms, setAvailableRooms] = useState([]);

    function showTab(tab) {
        // tab = 'pending' or 'verified' or 'paid' or ('student-card' <--- for all)
        document.querySelector(".tabs button.active")?.classList.remove("active");
        document.querySelector(`.tabs button.${tab}-tab-btn`)?.classList.add("active");

        document.querySelectorAll(".main-content .student-card").forEach((card) => {
            if (!card.classList.contains(tab)) {
                card.classList.add("display-none");
            } else {
                card.classList.remove("display-none");
            }
        });
        document.querySelector('.select-level').value = 'all'
        displayLevel('all')
    }

    function displayLevel(level) {
        // level --> data-level='level'
        console.log(level)
        const currentTab = document.querySelector('.tabs button.active').value
        document.querySelectorAll(`.main-content .cards-box > div.${currentTab}`).forEach(card => {
            if (card.getAttribute('data-level') === level) {
                card.classList.remove('display-none')
            } else if (level === 'all') {
                card.classList.remove('display-none')
            }
            else {
                card.classList.add('display-none')
            }
        })
    }
    useEffect(() => {
        const av_rooms = RoomsData.filter(room => room.occupants.length < room.capacity)
        setAvailableRooms(av_rooms)
        setSelectedRoom(av_rooms?.[0]?.room_number)
        // SetRooms(RoomsData);
        SetStudents(StudentsData);
    }, [RoomsData, StudentsData]);

    async function assignRoom(filler_matric_no = '') {
        try {
            // console.log(filler_matric_no,filler_room_no)
            const matric_no1 = matric_no || filler_matric_no
            const room_number = selected_room



            // let found_student_data;
            // const student_index = StudentsData.findIndex(student => {
            //     if (student.matric_no === matric_no1) {
            //         found_student_data = student
            //         found_student_data.room = room_number
            //         console.log(found_student_data)
            //         return true
            //     } else { return false }
            // })
            // StudentsData[student_index] = found_student_data
            // setStudents(StudentsData)
            // console.log(room_number,matric_no1)
            // return
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/assign-room`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matric_no: matric_no1, room_number })
            });
            const result = await response.json();

            if (response.ok) {
                let found_student_data;
                const student_index = StudentsData.findIndex(student => {
                    if (student.matric_no === matric_no1) {
                        found_student_data = student
                        found_student_data.room = room_number
                        console.log(found_student_data)
                        return true
                    } else { return false }
                })
                StudentsData[student_index] = found_student_data
                setStudents([...StudentsData])
                toast(result.msg || 'Added Successfully', { type: "success" });
                if (filler_matric_no) setChoicesModal(false)

            } else {
                toast(result.msg || "-Network Error, Please Try Again", { type: "warning" });
            }
        } catch (error) {
            console.log(error)
            toast(`-Network Error, Try again later.`, { type: "error" });
        }
    }

    // useEffect(() => {
    // }, []);


    // console.log(students);
    return (
        <div className="page adminpage">
            <div id="notification" className="notification"></div>
            <div
                style={{ zIndex: "3" }}
                className="spinner-cover cover display-none"
            >
                <div id="spinner" className="spinner"></div>
            </div>
            {choices_modal &&
                <div className="flex modal choices">
                    <div className="allocation-box">
                        <button className="close-btn" onClick={() => setChoicesModal(false)}>X</button>
                        <h1>Room Allocation</h1>
                        <p className="header-caption dim-text">
                            Assign a room to <span className="--name">{student_name}</span>{" "}
                            <span className="--matric_no">({matric_no})</span>
                        </p>
                        <p>Available Rooms ({available_rooms.length})</p>
                        <div className="rooms-box">
                            {available_rooms?.map((room, i) => (
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
                                    selected_room={selected_room}
                                    setSelectedRoom={setSelectedRoom}
                                />
                            ))}
                        </div>

                        <div className="allocation-btns-box">
                            <button onClick={assignRoom} id="accept-room" className="ok">
                                Assign Room
                            </button>
                            <button onClick={() => setChoicesModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            <div className="welcome-box">
                <h2>Student Management</h2>
                <p>Verify, reject, and assign rooms to students</p>
            </div>

            <section className="main-content">
                <div className="tabs">
                    <button value="student-card" onClick={(e) => showTab(e.target.value)} className="active student-card-tab-btn">
                        All Students
                    </button>
                    <button className="pending-tab-btn" onClick={(e) => showTab(e.target.value)} value="pending">Pending</button>
                    <button className="verified-tab-btn" onClick={(e) => showTab(e.target.value)} value="verified">Verified</button>
                    <button className="paid-tab-btn" onClick={(e) => showTab(e.target.value)} value="paid">Paid</button>
                </div>

                <div className="filters">
                    {/* <input type="text" placeholder="Search students..." /> */}
                    <select className="select-level" onChange={(e) => displayLevel(e.target.value)}>
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
                            status={student.status}
                            // verified={student.verified}
                            payments={student.payments}
                            name={student.name}
                            matric_no={student.matric_no}
                            email={student.email}
                            preference={student.preference}
                            level={student.level}
                            room={student.room}
                            profile_pic={student.profile_pic}
                            pdfs_length={student?.pdfs?.length || '0'}
                            setChoicesModal={setChoicesModal}
                            setMatricNo={setMatricNo}
                            setStudentName={setStudentName}
                            assignRoom={assignRoom}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
