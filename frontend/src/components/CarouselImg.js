import React from "react";
import {Carousel, CarouselItem} from 'react-bootstrap'

const CarouselImg = ({images}) => {
    return (
        <Carousel>
            {images.map(item => (
                        <Carousel.Item>
                            <img
                            className="img-thumbnail"
                            src={require (`../images/${item}`)}
                            alt="Third slide"
                            height="330" 
                            width="560"
                            />
                        </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CarouselImg;