import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from '../application/Home'
import Recommend from '../application/Recommend'
import Singers from '../application/Singers'
import Rank from '../application/Rank'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: <Recommend />
      },
      {
        path: 'recommend',
        element: <Recommend />
      },
      {
        path: 'singers',
        element: <Singers />
      },
      {
        path: 'rank',
        element: <Rank />
      }
    ]
  }
])

export default router
