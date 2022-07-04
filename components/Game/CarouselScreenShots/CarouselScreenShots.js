import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map, size } from "lodash";

const settings = {
  className: "carousel-screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  swipeToSlide: true,
};

const CarouselScreenShots = (props) => {
  const { title, screenshots } = props;
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleOpen = (image) => {
    setShowModal(true);
    setCurrentImage(image);
  };

  return (
    <>
      <Slider {...settings}>
        {map(screenshots, (screenshot) => (
          <Image
            key={screenshot.id}
            src={screenshot.url}
            alt={screenshot.name}
            onClick={() => handleOpen(screenshot.url)}
          />
        ))}
      </Slider>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={currentImage} alt={title} />
      </Modal>
    </>
  );
};
export default CarouselScreenShots;
