import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import { SliderContainer } from './style'

function Slider(props) {
  const { bannerList } = props

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          <Swiper
            spaceBetween={0}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            pagination={{
              el: '.swiper-pagination'
            }}
            modules={[Autoplay, Pagination]}
          >
            {bannerList.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    src={item.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider)
