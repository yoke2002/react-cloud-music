import React from 'react'

import Scroll from '../Scroll'

import styled from 'styled-components'
import style from '../../assets/global-style'

const List = styled.div`
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  width: fit-content;
  height: 30px;
  > span:first-of-type {
    display: block;
    flex: none;
    margin-right: 5px;
    padding: 5px 0;
    font-size: ${style['font-size-m']};
    color: grey;
  }
`

const ListItem = styled.span`
  flex: none;
  padding: 5px 8px;
  font-size: ${style['font-size-m']};
  border-radius: 10px;
  &.selected {
    color: ${style['theme-color']};
    border: 1px solid ${style['theme-color']};
    opacity: 0.8;
  }
`

function Horizontal(props) {
  const { title, list, oldVal, handleClick } = props

  return (
    <Scroll direction="horizontal">
      <List>
        <span>{title}</span>
        {list.map((item, index) => {
          return (
            <ListItem
              key={item.key}
              className={oldVal === item.key ? 'selected' : ''}
              onClick={() => handleClick(item.key)}
            >
              {item.name}
            </ListItem>
          )
        })}
      </List>
    </Scroll>
  )
}

export default React.memo(Horizontal)
