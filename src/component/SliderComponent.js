import React, { Component, Fragment } from "react";
import "element-theme-default";
import { Carousel } from "element-react";
import img1 from './slider-image/slide-01.svg';
import img2 from './slider-image/slide-02.svg';
import img3 from './slider-image/slide-03.svg';
import img4 from './slider-image/slide-04.svg';
import img5 from './slider-image/slide-05.svg';


export default class SliderComponent extends Component {
  render() {
    return (
      <Fragment>
        <div className="slider-wrapper">
          <div className="inside-wrapper">
            <Carousel indicatorPosition="outside">
              {[ img4, img5 , img1, img2, img3].map((item, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img src={item} alt="" />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </div>
      </Fragment>
    );
  }
}
