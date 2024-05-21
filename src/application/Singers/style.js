import styled from 'styled-components'
import style from '../../assets/global-style'

export const NavContainer = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
`
export const ListContainer = styled.div`
  overflow: hidden;
  position: fixed;
  top: 160px;
  bottom: 0;
  left: 0;
  width: 100%;
`
export const List = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: auto;
  .title {
    margin: 10px 0 10px 10px;
    font-size: ${style['font-size-s']};
    color: ${style['font-color-desc']};
  }
`
export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 5px;
  padding: 5px 0;
  border-bottom: 1px solid ${style['border-color']};
  .img-wrapper {
    margin-right: 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 3px;
    }
  }
  .name {
    margin: 10px 0 10px 10px;
    font-size: ${style['font-size-s']};
    color: ${style['font-color-desc']};
  }
`
