import React from 'react'
import { useState } from 'react'

import Horizontal from '../../base-ui/Horizontal'
import { alphaTypes, categoryTypes } from '../../api/config'
import { NavContainer } from './style'

function Singers(props) {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')

  const handleUpdateCategory = (val) => {
    setCategory(val)
  }

  const handleUpdateAlpha = (val) => {
    setAlpha(val)
  }

  return (
    <NavContainer>
      <Horizontal
        list={categoryTypes}
        title="分类（默认热门）:"
        oldVal={category}
        handleClick={handleUpdateCategory}
      />
      <Horizontal
        list={alphaTypes}
        title="首字母:"
        oldVal={alpha}
        handleClick={handleUpdateAlpha}
      />
    </NavContainer>
  )
}

export default React.memo(Singers)
