import React from 'react'
import { Outlet } from 'react-router-dom'

function Home(props) {
  return (
    <>
      <div>Home</div>
      <Outlet />
    </>
  )
}

export default React.memo(Home)
