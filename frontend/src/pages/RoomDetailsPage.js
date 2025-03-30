import React, { useEffect, useState, useContext } from "react";
import "../components/css/roomdetailspage.css"; // Make sure to create this file and import it
import { Building, CreditCard, Users, X } from "lucide-react";
// import img from './img6.jpg'
import { useSearchParams } from "react-router-dom";
import { UserContext } from '../components/js/UserContext';

export default function RoomPreview() {
    const [searchParams] = useSearchParams();
    const requested_room = searchParams.get('id');
    const [modal, setModal] = useState(false);
    const { RoomsData } = useContext(UserContext);
    const [card_number, setCardNumber] = useState("1234 5678 91112")
    const [expiry_date, setExpiryDate] = useState("2024-03-30")
    const [cvv, setCvv] = useState("007")
    const [card_name, setCardName] = useState("Dan")
    let roomData = { ...RoomsData?.find(({ room_number }) => room_number === requested_room) }
    console.log(roomData);
    useEffect(() => {

    }, [])

    return (
        <div className="page room-details-page">
            {modal &&
                <div className="modal">
                    <div className="content">
                        <button className="close-btn" onClick={() => setModal(false)}>
                            <X />
                        </button>
                        <h1 className="topic">Complete Payment</h1>
                        <p className="caption">
                            Enter your payment details to book Room {roomData.room_number}
                        </p>
                        <div className="booking">
                            <h3>Booking Summary</h3>
                            <ol className="vaild-date">
                                <li>
                                    <p>CHECK-IN</p>
                                    <p>12-01-2025</p>
                                </li>
                                <li>
                                    <p>CHECK-OUT</p>
                                    <p>15-01-2026</p>
                                </li>
                            </ol>

                            <ol className="fees-box table-look">
                                <li>
                                    <p>Hostel Fee</p>
                                    <p>₦ 6,000</p>
                                </li>
                                <li>
                                    <p>Room Chagers</p>
                                    <p>₦ 3,000</p>
                                </li>
                                <li>
                                    <p>Maintancence Fee</p>
                                    <p>₦ 3,000</p>
                                </li>
                            </ol>
                            <hr className="total-ruler" />
                            <ol className="table-look">
                                <li>

                                    <p>Total:</p>
                                    <p>₦ 12,000</p>
                                </li>
                            </ol>
                        </div>
                        <h3 className="form-start-header">Card Information</h3>
                        <form id="payment-form">

                            <div className="input-group">
                                <CreditCard className="icon" />
                                <input
                                    type="text"
                                    placeholder="********"
                                    value={card_number}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="row date-cvv-box">
                                <input
                                    type="date"
                                    id="expiry-date"
                                    placeholder="MM/YY"
                                    value={expiry_date}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    required
                                />
                                <input
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    type="number" required />

                            </div>

                            <label htmlFor="card-number" className="card-number-label">Cardholder Name</label>
                            <input 
                            value={card_name}
                            onChange={(e) => setCardName(e.target.value)}
                            type="text" 
                            id="card-number-input" required />

                            <div className="row">
                                <button className="cancel-btn" type="submit">Cancel</button>
                                <button className="pay primary-btn" type="submit">Pay ₦ 12,000</button>
                            </div>
                        </form>
                    </div>

                </div>

            }

            <section className="heading">
                <div>
                    <h1><Building /> Room {roomData.room_number} Details</h1>
                    <p className="caption"> View detailed information about this room</p>
                </div>
            </section>
            <section className="main-content">
                <div>
                    {/* <ImageComponent imageName='img6.'/> */}
                    <img src={`${process.env.PUBLIC_URL}/imgs/${roomData.img}`} alt="room img" className="room-img" />
                    {/* <div className="room-img"> </div> */}
                    <div className="preview-status">
                        <h3> Room Status </h3>
                        <p>
                            <span className="green-dot"></span>
                            {roomData?.status}</p>
                        <h3>Current Occupancy </h3>
                        <p>  <Users /> {roomData.occupants?.length} of {roomData.capacity} occupants</p>
                    </div>
                </div>
                <div className="sub-info">
                    <h3>Room Information</h3>
                    <div className="data-box">
                        <div className="row">
                            <p>Block:</p>
                            <p>{roomData.block}</p>

                        </div>
                        <div className="row">
                            <p>Room Number:</p>
                            <p>{roomData.room_number}</p>
                        </div>
                        <div className="row">
                            <p>Floor Level:</p>
                            <p>{roomData.floor}</p>
                        </div>
                        <div className="row">
                            <p>Capacity:</p>
                            <p>{roomData.capacity}</p>
                        </div>
                    </div>
                    <h3>Amenities</h3>
                    <div className="row amenities-box">
                        {roomData.amenities?.[0].split(',').slice(0, 3).map(amenity => (
                            <div key={amenity} className="amenitie">{amenity}</div>
                        ))}
                    </div>
                    <div className='payment-preview'>
                        <h3>Pricing Information</h3>
                        <p className="sub-txt">Room fees are charged per semester and include all basic amenities. Additional services may incur extra charges.</p>


                        <div className="row price-box">
                            <p>₦ 12,000 / Semester</p>
                            <button onClick={() => setModal(true)} className="primary-btn">Book Now</button>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}
