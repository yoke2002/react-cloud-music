import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import router from './router'
import store from './store'

import { IconStyle } from './assets/iconfont/iconfont'
import { GlobalStyle } from './style'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
