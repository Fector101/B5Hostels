export default function Dashboard() {
    
    return (
        <div className="page">
            <div className="welcome-box">
                <h1>Admin Dashboard</h1>
                <p className="dim-text">
                    Manage student accommodations and room allocations
                </p>
            </div>
            <div className="cards">
                <div className="card">
                    <span className="strip"></span>
                    <div className="content">
                        <div className="row total-students">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-5 w-5 text-blue-600" data-lov-id="src/pages/Dashboard.tsx:24:12" data-lov-name="Users" data-component-path="src/pages/Dashboard.tsx" data-component-line="24" data-component-file="Dashboard.tsx" data-component-name="Users" data-component-content="%7B%22className%22%3A%22h-5%20w-5%20text-blue-600%22%7D"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            <h3>Total Students</h3>
                        </div>
                        <p>Registered in system</p>
                        <span>total_students</span>
                    </div>
                </div>
                <div className="card">
                    <span className="strip"></span>
                    <div className="content">
                        <div className="row pending-students">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-5 w-5 text-yellow-600" data-lov-id="src/pages/Dashboard.tsx:31:12" data-lov-name="Clock" data-component-path="src/pages/Dashboard.tsx" data-component-line="31" data-component-file="Dashboard.tsx" data-component-name="Clock" data-component-content="%7B%22className%22%3A%22h-5%20w-5%20text-yellow-600%22%7D"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <h3>Pending Verification</h3>
                        </div>
                        <p>Awaiting approval</p>
                        <span>awaiting_approval</span>
                    </div>
                </div>
                <div className="card">
                    <span className="strip"></span>
                    <div className="content">
                        <div className="row verified-students">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big h-5 w-5 text-green-600" data-lov-id="src/pages/Dashboard.tsx:38:12" data-lov-name="CheckCircle" data-component-path="src/pages/Dashboard.tsx" data-component-line="38" data-component-file="Dashboard.tsx" data-component-name="CheckCircle" data-component-content="%7B%22className%22%3A%22h-5%20w-5%20text-green-600%22%7D"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                            <h3>Verified Students</h3>
                        </div>
                        <p>Approved for accommodation</p>
                        <span>total_students_that_have_rooms</span>
                    </div>
                </div>
                <div className="card">
                    <span className="strip"></span>
                    <div className="content">
                        <div className="row total-rooms">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building h-5 w-5 text-purple-600" data-lov-id="src/pages/Dashboard.tsx:52:12" data-lov-name="Building" data-component-path="src/pages/Dashboard.tsx" data-component-line="52" data-component-file="Dashboard.tsx" data-component-name="Building" data-component-content="%7B%22className%22%3A%22h-5%20w-5%20text-purple-600%22%7D"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
                            <h3>Total Rooms</h3>
                        </div>
                        <p>Available in the hostel</p>
                        <span>total_rooms</span>
                    </div>
                </div>
                <div className="card">
                    <span className="strip"></span>
                    <div className="content">
                        <div className="row verified-students">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-5 w-5 text-emerald-600" data-lov-id="src/pages/Dashboard.tsx:59:12" data-lov-name="HomeIcon" data-component-path="src/pages/Dashboard.tsx" data-component-line="59" data-component-file="Dashboard.tsx" data-component-name="HomeIcon" data-component-content="%7B%22className%22%3A%22h-5%20w-5%20text-emerald-600%22%7D"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                            <h3>Available Rooms</h3>
                        </div>
                        <p>Ready for allocation</p>
                        <span>available_rooms</span>
                    </div>
                </div>
            </div>
            <div className="main-page-details-box flex-wrap">
                <div className="card attention-card" id="open-rooms-page">
                    <h3>Students Needing Attention</h3>
                    <p>Students that require verification or room allocation</p>
                    <div className="card-item">
                        <span className="icon">⏳</span>
                        <div>
                            <strong>Pending Verification</strong>
                            <p> awaiting_approval students awaiting verification</p>
                        </div>
                        <button className="view-btn">View All</button>
                    </div>
                    <div className="card-item">
                        <span className="icon">🏠</span>
                        <div>
                            <strong>Verification Students</strong>
                            <p>awaiting_approval students with assigned rooms</p>
                        </div>
                        <button className="view-btn">View All</button>
                    </div>
                </div>

                <div className="card status-card">
                    <h3>Room Occupancy Status</h3>
                    <p>Current status of all rooms in the hostel</p>
                    <div className="status-list">
                        <div className="status-item">
                            <span className="status-dot available"></span> Available
                            Rooms
                            <span className="count">available_rooms </span>
                        </div>
                        <div className="status-item">
                            <span className="status-dot occupied"></span> Fully Occupied
                            <span className="count"> full_rooms</span>
                        </div>
                        <div className="status-item">
                            <span className="status-dot maintenance"></span> Under
                            Maintenance <span className="count">under_maintenance </span>
                        </div>
                    </div>
                    <button className="view-btn" id="view-all-rooms">View All Rooms</button>
                </div>
            </div>
        </div>
    )
}