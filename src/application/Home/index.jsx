import React from 'react'
import { Outlet } from 'react-router-dom'

import { Top, Tab, TabItem } from './style'
import { NavLink } from 'react-router-dom'

function Home() {
  const tabs = [
    { name: '推荐', path: '/recommend' },
    { name: '歌手', path: '/singers' },
    { name: '排行榜', path: '/rank' }
  ]

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">网易云音乐</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>

      <Tab>
        {tabs.map((item, index) => {
          const { name, path } = item
          return (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) => [isActive ? 'selected' : '']}
            >
              <TabItem>
                <span>{name}</span>
              </TabItem>
            </NavLink>
          )
        })}
      </Tab>

      <Outlet />
    </div>
  )
}

export default React.memo(Home)
