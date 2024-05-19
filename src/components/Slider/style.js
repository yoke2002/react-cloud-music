import styled from 'styled-components'
import style from '../../assets/global-style'

export const SliderContainer = styled.div`
  position: relative;
  .before {
    position: absolute;
    top: 0;
    width: 100%;
    height: 60px;
    background: ${style['theme-color']};
  }
  .slider-container {
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
  }
  .swiper-pagination-bullet-active {
    background: ${style['theme-color']};
  }
`
