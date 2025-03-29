import { TrendingUp, Tv, ChartNoAxesColumn, ChartColumn, Vote, ChevronRight, ArrowRight, Clock, Users, MoveRight, Plus, User, Home, Building, Check, CheckCircle, Info } from "lucide-react"
// import Carousel from "../components/ui/carousel/Carousel"
// import SectionPreview from "./../components/js/SectionPreview"
// import Recommendations from "./../components/js/Recommendations"
// import LoginComponent from "../components/ui/login-signup/LoginForm"
import '../components/css/profilepage.css'
import { useState } from "react";
function Myprogress({ value }) {
    console.log(value + '%')
    return (
        <div className="progress-range" style={{ 'width': '100%', backgroundColor: '#cac8c8', height: '10px', borderRadius: '5px', marginBottom: '4px', overflow: 'hidden' }}>
            <div style={{ width: value + '%', backgroundColor: '#4ec9e6', height: '100%' }} className="progress-value"></div>
        </div>
    )
}
function VotingStats({ title, des, runners_info_tuple }) {
    // runners_info_tuple =[['name',140]]   
    // runners_info_tuple =[['name','votes'],...]   
    const total_votes = runners_info_tuple.reduce((sum, [, votes]) => sum + votes, 0);
    // console.log(total_votes, '---')
    return (
        <div className="voting-stats-card">
            <div className="row"><div className="badge active"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dot"><circle cx="12.1" cy="12.1" r="1"></circle></svg> Active</div><div className="caption"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><p>Ends: 2025-04-10</p></div></div>
            <h4>{title}</h4>
            <p className="caption">{des}</p>
            <div className="runners-box">
                {runners_info_tuple?.map(([name, votes], i) => {
                    const percentage = total_votes > 0 ? ((votes / total_votes) * 100).toFixed(2) : 0;
                    console.log(total_votes, '---')

                    return (
                        <div>
                            <div className="row">
                                <p>{name}</p>
                                <p className="caption">{votes} votes</p>
                            </div>
                            <Myprogress value={percentage} />
                        </div>)
                })}
            </div>
            <p>Total votes: {total_votes}</p>
            <a className="view-all-votes-btn primary-btn">View Details <ArrowRight /></a>
        </div>
    )
}
export default function Profilepage() {
    const [current_tab, setCurrentTab] = useState(() => 'room')
    const [room, setRoom] = useState(() => '2')
    const [verified, setVerified] = useState(() => '1')
    const [preference, setPreference] = useState(() => '1')

    return (
        <div className="profile-page page">
            <section className="heading">
                <div>
                    <h1>Student Profile</h1>
                    <p className="caption"> View your account details</p>
                </div>
            </section>

            <section className="main-content">

                <section className="student-details-box">
                    <div className="profile-img">
                        <p>FJ</p>
                    </div>
                    <h3 className="name">Fabian Joseph</h3>
                    <p className="caption matric-no">FT23CMP0040</p>

                    <div className="row email-level-box">
                        <p className="email">
                            <User />
                            fabian@gmail.com</p>
                        <p className="level">100 Level</p>
                    </div>

                    <hr />

                    <h4 className="status-txt">Account Status</h4>
                    <p className="status-txt"> Your account has been verified. You are eligible for a room. </p>
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

                                {room ?
                                    <>
                                        <div className="name-floor-box">
                                            <Home />
                                            <div>
                                                <p>Room 101, Block A</p>
                                                <p className="caption">Floor 1</p>
                                            </div>
                                        </div>

                                        <div className="occupants-box">
                                            <div className="occupant">
                                                <h3 className="caption">Capacity</h3>
                                                <p>4 Students</p>
                                            </div>
                                            <div className="occupant">
                                                <h3 className="caption">Current Occupants</h3>
                                                <p>1 Students</p>
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
                                            {verified ? "You've been verified, but no room has been assigned to you yet." : "You need to be verified before a room can be assigned to you."}
                                        </p>
                                    </div>
                                }
                            </div>
                            :
                            <div className="preference-tab">

                                {verified ?
                                    room ?
                                        <p className={room ? "assigned-txt room-status" : 'unassigned-txt room-status'}>
                                            <Info />
                                            You already have a room assigned. If you need to change rooms, please contact the hostel administration.
                                        </p>
                                        : <div className="sub-box">
                                            <p className="heading">Current Preference</p>
                                            <p className="caption">{preference?"Room Number: "+preference:"You haven't set a room preference yet."}</p>
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
