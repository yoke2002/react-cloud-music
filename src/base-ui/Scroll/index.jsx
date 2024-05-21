import React from 'react'
import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  useMemo
} from 'react'
import styled from 'styled-components'
import BScroll from 'better-scroll'

import Loading from '../Loading'
import LoadingV2 from '../LoadingV2'
import { debounce } from '../../api/utils'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  z-index: 100;
  margin: auto;
  width: 60px;
  height: 60px;
`
const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  margin: auto;
  height: 30px;
`

const InnerScroll = (props, ref) => {
  const {
    direction = 'vertical',
    click = true,
    refresh = true,
    pullUpLoading = false,
    pullDownLoading = false,
    bounceTop = true,
    bounceBottom = true
  } = props
  const { pullUp, pullDown, onScroll } = props

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300)
  }, [pullUp])
  // 千万注意，这里不能省略依赖，
  // 不然拿到的始终是第一次 pullUp 函数的引用，相应的闭包作用域变量都是第一次的，产生闭包陷阱。下同。

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300)
  }, [pullDown])

  const [bScroll, setBScroll] = useState(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    })

    setBScroll(scroll)

    return () => {
      setBScroll(null)
    }
  }, [])

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll)
    })

    return () => {
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    }
    bScroll.on('scrollEnd', handlePullUp)
    // 解绑
    return () => {
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [pullUp, pullUpDebounce, bScroll])

  // 判断用户的下拉动作
  useEffect(() => {
    if (!bScroll || !pullDown) return
    const handlePullDown = (pos) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce()
      }
    }
    bScroll.on('touchEnd', handlePullDown)
    return () => {
      bScroll.off('touchEnd', handlePullDown)
    }
  }, [pullDown, pullDownDebounce, bScroll])

  // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
  useImperativeHandle(ref, () => ({
    // 给外界暴露 refresh 方法
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    }
  }))

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      <PullUpLoading
        style={pullUpLoading ? { display: '' } : { display: 'none' }}
      >
        <Loading />
      </PullUpLoading>
      <PullDownLoading
        style={pullDownLoading ? { display: '' } : { display: 'none' }}
      >
        <LoadingV2 />
      </PullDownLoading>
    </ScrollContainer>
  )
}

const Scroll = React.forwardRef(InnerScroll)

export default Scroll
