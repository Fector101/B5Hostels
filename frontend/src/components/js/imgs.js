// import img1 from './img1.jpg';
// import img2 from './img2.jpg';
// import img3 from './img3.jpg';
// import img4 from './img4.jpg';
// import img5 from './img5.jpg';
// import img6 from './img6.jpg';
// import img7 from './img7.jpg';
// import img8 from './img8.jpg';
// import img9 from './img9.jpg';
// import img10 from './img10.jpg';
// import img11 from './img11.jpg';
// import img12 from './img12.jpg';
// import img13 from './img13.jpg';
// import img14 from './img14.jpg';
// import img15 from './img15.jpg';
// import img16 from './img16.jpg';
// import img17 from './img17.jpg';
// import img18 from './img18.jpg';
// import img19 from './img19.jpg';
// import img20 from './img20.jpg';

const imgs = {
//   "img1.jpg": img1,
//   "img2.jpg": img2,
//   "img3.jpg": img3,
//   "img4.jpg": img4,
//   "img5.jpg": img5,
//   "img6.jpg": img6,
//   "img7.jpg": img7,
//   "img8.jpg": img8,
//   "img9.jpg": img9,
//   "img10.jpg": img10,
//   "img11.jpg": img11,
//   "img12.jpg": img12,
//   "img13.jpg": img13,
//   "img14.jpg": img14,
//   "img15.jpg": img15,
//   "img16.jpg": img16,
//   "img17.jpg": img17,
//   "img18.jpg": img18,
//   "img19.jpg": img19,
//   "img20.jpg": img20,
};


const ImageComponent = ({ imageName }) => {
  return <img src={imgs[imageName]} alt={imageName} />;
};

export default ImageComponent;
