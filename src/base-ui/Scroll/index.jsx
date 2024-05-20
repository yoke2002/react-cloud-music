import React from 'react'
import { useRef, useState, useEffect, useImperativeHandle } from 'react'
import styled from 'styled-components'
import BScroll from 'better-scroll'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
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
    bScroll.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp()
      }
    })
    return () => {
      bScroll.off('scrollEnd')
    }
  }, [pullUp, bScroll])

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
    <ScrollContainer ref={scrollContainerRef}>{props.children}</ScrollContainer>
  )
}

const Scroll = React.forwardRef(InnerScroll)

export default Scroll
