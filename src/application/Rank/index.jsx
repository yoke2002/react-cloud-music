import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getRankList } from './rankSlice'
import { filterIndex } from '../../api/utils'
import Loading from '../../base-ui/Loading'
import Scroll from '../../base-ui/Scroll'
import { Container, List, ListItem, SongList } from './style'

function Rank() {
  const { rankList, loading } = useSelector((state) => state.rank)
  const dispatch = useDispatch()

  let globalStartIndex = filterIndex(rankList)
  let officialList = rankList.slice(0, globalStartIndex)
  let globalList = rankList.slice(globalStartIndex)

  useEffect(() => {
    dispatch(getRankList())
  }, [])

  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item, index) => {
          return (
            <ListItem key={`${item.coverImgId}-${index}`} tracks={item.tracks}>
              <div className="img-wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update-frequency">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          )
        })}
      </List>
    )
  }

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          )
        })}
      </SongList>
    ) : null
  }

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? { display: 'none' } : { display: '' }

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>
            {' '}
            官方榜{' '}
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            {' '}
            全球榜{' '}
          </h1>
          {renderRankList(globalList, true)}
          {loading ? <Loading /> : null}
        </div>
      </Scroll>
    </Container>
  )
}

export default React.memo(Rank)
