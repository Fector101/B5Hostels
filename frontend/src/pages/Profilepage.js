import { useContext, useEffect, useState } from "react";
import { User, Home, Building, CheckCircle, Info, ImagePlus } from "lucide-react"
import { toast } from "react-toastify";
import GoToTop from "../components/js/GoToTop";
import UploadPDF from "../components/ui/UploadPDF";
import { UserContext } from '../components/js/UserContext';
import '../components/css/profilepage.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Profilepage() {
    const [current_tab, setCurrentTab] = useState(() => 'room')
    const { userData, setUser } = useContext(UserContext);
    const [file, setFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        setImgUrl(userData.profile_pic)
    }, [userData?.profile_pic])
    const handleFileChange = (event) => {
        console.log(event.target.files[0])
        setFile(() => {
            if (event.target.files[0].size > 30 * 1024 * 1024) {
                toast('File size exceeds 3MB - too large', { type: 'warning' });
                return
            }
            return event.target.files[0]
        });
    };

    async function sendProfilePic() {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/upload-profile-pic`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(`Upload progress: ${percent}%`);
                        setUploadProgress(percent)
                    },
                }
            );

            const data = response.data;
            setImgUrl(data.url);
            setUser((prev) => ({ ...prev, profile_pic: data.url }));
            toast.success(data.msg || 'Profile picture updated successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            const msg = error.response?.data?.msg || 'Failed to upload image';
            toast.error(msg);
        } finally {
            setFile(null);
            setLoading(false);
        }
    }

    async function logOut() {
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/authn/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            navigate('/login')
        } catch (error) {
            console.log('Werid Logout error: ', error)
        }
    }
    const queryInput = () => {
        const input = document.querySelector('.profile-input');
        if (input) {
            input.click();
        }
    }
    return (
        <div className="profile-page page">
            {loading &&
                <div className="modal uploading-modal">
                    <div className="spinner"></div>
                    <p className="">Uploading Photo ... {uploadProgress ? uploadProgress - 1 : uploadProgress}%</p>
                </div>
            }

            {file &&
                <div className="confirm-pic-modal modal">
                    <div className="confirm-box">
                        <p>Are you sure you want to upload this?</p>
                        <div className="btns flex justify-content-end">
                            <button className="btn cancel" onClick={() => setFile(null)}>Cancel</button>
                            <button className="btn ok" onClick={() => {
                                sendProfilePic()
                                setFile(null)
                            }}>Upload</button>
                        </div>
                    </div>
                </div>
            }
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

                    <div className={"profile-img" + (imgUrl ? '' : ' no-img')} title="Update Profile Picture (<3MB)" onClick={queryInput}>
                        <input hidden className="profile-input" type="file" accept="image/*" onChange={handleFileChange} />
                        {/* <p>{userData.initials}</p> */}
                        {imgUrl ? <img src={imgUrl} alt="profile-pic" /> : <ImagePlus />}
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

                    <h4 className="status-txt">{userData.room ? "Room" : "Account"} Status</h4>
                    <p className="status-txt"> {userData.verified ? userData.room ? userData.days_passed + ' of 360 days' : "Your account has been verified. You are eligible for a room." : "Your account is pending verification. Please check back later."}</p>
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
                                                <p>{userData.room_mates?.length} Student{userData.room_mates?.length > 1 ? 's' : ''}</p>
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
                                        {!userData.verified ? <UploadPDF /> : <></>}
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
                    <button className="logout-btn" onClick={logOut}>Logout</button>
                </section>

            </section>
            <GoToTop />
        </div>
    )
}
