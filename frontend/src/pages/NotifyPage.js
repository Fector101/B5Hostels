import { useContext } from "react";
import { UserContext } from '../components/js/UserContext';
import '../components/css/notifypage.css'
export default function NotifyPage() {
    const { userData } = useContext(UserContext);
    console.log(userData)
    return (
        <div className='notifypage page'>
            {userData.room &&
                <div className='my-notify'>
                    <h1>Assigned Room</h1>
                    <p>You've been Assigned to: Room {userData.room}.</p>
                </div>
            }
            {userData?.status &&
                <div className='my-notify'>
                    <h1>{['pending','rejected'].includes(userData.status) ? userData.status + ' Verification' : 'Verified Account'}</h1>
                    <p>{
                    userData.status === 'pending'?'Your account verification is pending'
                    :`Your account has been ${userData.status}.`}</p>
                </div>
            }
            {userData.total_paid ?
                <div className='my-notify'>
                    <h1>Payment SuccessFul</h1>
                    <p>Hostel Fee successfully sent.</p>
                </div>:<></>
            }

            <div className='my-notify'>
                <h1>SuccessFul Registation</h1>
                <p>Your account has been created, Awaiting Verification.</p>
            </div>

        </div>
    )
}