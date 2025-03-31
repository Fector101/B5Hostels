import { useContext, useEffect, useState } from "react";
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
            {userData.verified &&
                <div className='my-notify'>
                    <h1>Verified Registation</h1>
                    <p>Your account has been verified.</p>
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