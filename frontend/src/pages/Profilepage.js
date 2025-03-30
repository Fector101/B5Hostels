import { User, Home, Building, CheckCircle, Info } from "lucide-react"
import '../components/css/profilepage.css'
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../components/js/UserContext';
import { useNavigate } from "react-router-dom";

// const { user, setUser } = useContext(null);
export default function Profilepage() {
    const [current_tab, setCurrentTab] = useState(() => 'room')
    const navigate = useNavigate()
    const { userData } = useContext(UserContext);
  
    useEffect(() => {
        const timeout_secs=15
        const timeout = setTimeout(()=>{
            navigate('/login')
        },1000 * timeout_secs)
        if(Object.keys(userData).length){
            clearTimeout(timeout)
        }
        return () => {clearTimeout(timeout)}

    }, [userData]);


    return (
        <div className="profile-page page">
            {Object.keys(userData).length === 0 &&
                <div className='modal'>
                    <div id="spinner" className="spinner"></div>
                </div>

            }
            <section className="heading">
                <div>
                    <h1>Student Profile</h1>
                    <p className="caption"> View your account details</p>
                </div>
            </section>

            <section className="main-content">

                <section className="student-details-box">
                    <div className="profile-img">
                        <p>{userData.initials}</p>
                    </div>
                    <h3 className="name">{userData.name}</h3>
                    <p className="caption matric-no">{userData.matric_no}</p>

                    <div className="row email-level-box">
                        <p className="email">
                            <User />
                            {userData.email}</p>
                        <p className="level">{userData.level} Level</p>
                    </div>

                    <hr />

                    <h4 className="status-txt">Account Status</h4>
                    <p className="status-txt"> {userData.verified ? "Your account has been verified. You are eligible for a room." : "Your account is pending verification. Please check back later."}</p>
                </section>


                <section className="room-details">

                    <div className="row room-header">
                        <h3>Room Details</h3>
                        <div className="tab-btns">
                            <button onClick={() => setCurrentTab('room')} className={current_tab === 'room' ? 'active' : ''}>
                                <Home />
                                Room
                            </button>
                            <button onClick={() => setCurrentTab('preference')} className={current_tab === 'preference' ? 'active' : ''}>
                                <Building />
                                <p>Preference</p>
                            </button>
                        </div>
                    </div>

                    <p className="caption header-cap">View your assigned room or set your preference</p>
                    {
                        current_tab === 'room' ?
                            <div className="room-tab">

                                {userData.room ?
                                    <>
                                        <div className="name-floor-box">
                                            <Home />
                                            <div>
                                                <p>Room {userData.room}, {userData.block}</p>
                                                <p className="caption">Floor {userData.floor}</p>
                                            </div>
                                        </div>

                                        <div className="occupants-box">
                                            <div className="occupant">
                                                <h3 className="caption">Current Occupants</h3>
                                                <p>{userData.room_mates?.length} Students</p>
                                            </div>
                                            <div className="occupant">
                                                <h3 className="caption">Capacity</h3>
                                                <p> {userData.capacity} Students</p>
                                            </div>
                                        </div>

                                        <div className="amenities-box">
                                            <h3>Amenities</h3>
                                            <div>

                                                <p>Wifi</p>
                                                <p>Desk</p>
                                                <p>Wardrobe</p>
                                            </div>
                                        </div>

                                        <p className="last-p">  <CheckCircle /> You have been assigned to this room.</p>
                                    </>
                                    :
                                    <div className="sub-box">
                                        <div className="svg-box">
                                            <Home />
                                        </div>
                                        <p className="heading">No Room Assigned Yet</p>
                                        <p className="caption">
                                            {userData.verified ? "You've been verified, but no room has been assigned to you yet." : "You need to be verified before a room can be assigned to you."}
                                        </p>
                                    </div>
                                }
                            </div>
                            :
                            <div className="preference-tab">

                                {userData.verified ?
                                    userData.room ?
                                        <p className={userData.room ? "assigned-txt room-status" : 'unassigned-txt room-status'}>
                                            <Info />
                                            You already have a room assigned. If you need to change rooms, please contact the hostel administration.
                                        </p>
                                        : <div className="sub-box">
                                            <p className="heading">Current Preference</p>
                                            <p className="caption">{userData.preference ? "Room Number: " + userData.preference : "You haven't set a room preference yet."}</p>
                                        </div>

                                    :
                                    <div>
                                        <p className='unassigned-txt room-status'>
                                            <Info />
                                            Your account must be verified before you can set room preferences.
                                        </p>
                                    </div>
                                }

                            </div>
                    }

                </section>

            </section>
        </div>
    )
}
