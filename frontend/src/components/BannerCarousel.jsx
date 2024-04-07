import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Images } from '../constants';

const BannerCarousel = () => {
  const carouselStyle = {
    backgroundImage: `url(${Images.BANNER3})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Adjust the height as needed
  };

  return (
    <div>
      <Carousel autoPlay={true} interval={5000} infiniteLoop={true} showThumbs={false} showStatus={false} swipeable={true} >
        <div style={{
    backgroundImage: `url(${Images.BANNER0})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  }}>
        </div>
        <div style={{
    backgroundImage: `url(${Images.BANNER0})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  }}>
        </div>
        <div style={{
    backgroundImage: `url(${Images.BANNER0})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  }}>
        </div>
        <div style={{
    backgroundImage: `url(${Images.BANNER0})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  }}>
        </div>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
