import React from 'react'
import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Scroll from '../../base-ui/Scroll'
import Slider from '../../components/Slider'
import RecommendList from '../../components/List'

import { Content } from './style'
import { getBannerList, getRecommendList } from './recommendSlice'

function Recommend() {
  const { bannerList, recommendList } = useSelector((store) => store.recommend)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBannerList())
    dispatch(getRecommendList())
  }, [])

  const scrollRef = useRef(null)

  return (
    <Content>
      <Scroll ref={scrollRef}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
    </Content>
  )
}

export default React.memo(Recommend)
