import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import router from './router'
import store from './store'

import { IconStyle } from './assets/iconfont/iconfont'
import { GlobalStyle } from './style'
import Data from './application/Singers/data'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <Data>
        <RouterProvider router={router} />
      </Data>
    </Provider>
  )
}

export default App
