import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Images } from '../constants';

const BannerCarousel = () => {


  return (
    <div className='hidden lg:block bg-black'>
      <Carousel autoPlay={true} interval={100000} infiniteLoop={true} showThumbs={false} showStatus={false} swipeable={true} >
        <div style={{
    backgroundImage: `url(${Images.CAROUSEL1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  }}>
        </div>
        <div style={{
    backgroundImage: `url(${Images.CAROUSEL2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  }}>
        </div>
        <div style={{
    backgroundImage: `url(${Images.CAROUSEL3})`,
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
