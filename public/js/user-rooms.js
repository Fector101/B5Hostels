document.querySelector('.rooms-box')
.addEventListener('click', async (event) => {
    const clickedRoomBtn = event.target.closest('.room button');
    if (!clickedRoomBtn) return;
    const clickedRoom = clickedRoomBtn.closest('.room');
    const room_number = clickedRoom.getAttribute('data-room-number');
    console.log(room_number)
    window.location.href = '/room/' + room_number;


})
