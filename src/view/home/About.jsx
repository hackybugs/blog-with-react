import React, { useEffect } from 'react'
import Image from '../../images/pumabelt.jpg';
import Image1 from '../../images/1.jpg';
import Image2 from '../../images/2.jpg';
import Image3 from '../../images/3.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useState } from 'react';

var token = localStorage.getItem("jwt");
let apiUrl = process.env.REACT_APP_API_URL;
const apiurl = apiUrl+'/api/about';

function About() {
  const [imageData, setImageData] = useState([
    { 'image': Image2 },
    { 'image': Image3 },
    { 'image': Image1 }
  ])

  const response = async () => {
    const responseData = await axios.get(apiurl);
    let imgarray = responseData.data.data;

    let temp = [...imageData];
    imgarray.forEach(doc => temp.push({ 'image': doc.urls.full }));
    setImageData(temp);
  }

  useEffect(() => {
    response()
  }, [])

  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {imageData.map((image, index) => {
        console.log(image);
        return (
          <div>
            <img src={image.image} alt='1' height={500} />
          </div>
        )
      })
      }
    </Slider>
  );
}

export default About
