import React from "react";
import {Carousel, CarouselItem} from 'react-bootstrap'

const CarouselImg = ({images}) => {
    return (
        <Carousel>
            {images.map(item => (
                        <Carousel.Item>
                            <img
                            className="img-thumbnail"
                            src={`http://localhost:5000/image/${item}`}
                            alt="NO IMAGE"
                            height="330" 
                            width="560"
                            />
                        </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CarouselImg;