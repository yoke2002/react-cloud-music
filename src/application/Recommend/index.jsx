import React from 'react'
import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { forceCheck } from 'react-lazyload'

import Scroll from '../../base-ui/Scroll'
import Loading from '../../base-ui/Loading'
import Slider from '../../components/Slider'
import RecommendList from '../../components/List'

import { Content } from './style'
import { getBannerList, getRecommendList } from './recommendSlice'

function Recommend() {
  const { bannerList, recommendList, enterLoading } = useSelector(
    (store) => store.recommend
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBannerList())
    dispatch(getRecommendList())
  }, [])

  const scrollRef = useRef(null)

  return (
    <Content>
      {enterLoading ? <Loading /> : null}
      <Scroll ref={scrollRef} onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
    </Content>
  )
}

export default React.memo(Recommend)
