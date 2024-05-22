import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LazyLoad, { forceCheck } from 'react-lazyload'

import Horizontal from '../../base-ui/Horizontal'
import Scroll from '../../base-ui/Scroll'
import Loading from '../../base-ui/Loading'
import { alphaTypes, categoryTypes } from '../../api/config'
import { NavContainer, ListContainer, List, ListItem } from './style'
import {
  getHotSingerList,
  refreshMoreHotSingerList,
  getSingerList,
  refreshMoreSingerList,
  changeEnterLoading,
  changePullDownLoading,
  changePullUpLoading
} from './singerSlice'

import { CHANGE_ALPHA, CHANGE_CATEGORY, CategoryContext } from './data'

function Singers() {
  const { data, dispatch: categoryDispatch } = useContext(CategoryContext)
  const [category, setCategory] = useState(data.category)
  const [alpha, setAlpha] = useState(data.alpha)

  const { singerList, enterLoading, pullUpLoading, pullDownLoading } =
    useSelector((store) => store.singers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHotSingerList())
  }, [])

  const handleUpdateCategory = (val) => {
    setCategory(val)
    categoryDispatch({ type: CHANGE_CATEGORY, payload: val })
    dispatch(changeEnterLoading(true))
    dispatch(getSingerList({ category: val, alpha }))
  }

  const handleUpdateAlpha = (val) => {
    setAlpha(val)
    categoryDispatch({ type: CHANGE_ALPHA, payload: val })
    dispatch(changeEnterLoading(true))
    dispatch(getSingerList({ category, alpha: val }))
  }

  const handlePullUp = () => {
    dispatch(changePullUpLoading(true))
    if (category === '') {
      dispatch(refreshMoreHotSingerList())
    } else {
      dispatch(refreshMoreSingerList({ category, alpha }))
    }
  }

  const handlePullDown = () => {
    dispatch(changePullDownLoading(true))
    if (category === '' && alpha === '') {
      dispatch(getHotSingerList())
    } else {
      dispatch(getSingerList({ category, alpha }))
    }
  }

  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
              <div className="img-wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={new URL('./singer.png', import.meta.url).href}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }

  return (
    <>
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
      <ListContainer>
        <Loading show={enterLoading}></Loading>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </>
  )
}

export default React.memo(Singers)
