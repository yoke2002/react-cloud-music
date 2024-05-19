import styled from 'styled-components'
import style from '../../assets/global-style'

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  background: ${style['theme-color']};
  & > span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`

export const Tab = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  background: ${style['theme-color']};

  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected {
      span {
        padding: 3px 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
`

export const TabItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
