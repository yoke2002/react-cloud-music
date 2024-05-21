import { configureStore } from '@reduxjs/toolkit'
import recommendSlice from '../application/Recommend/recommendSlice'
import singerSlice from '../application/Singers/singerSlice'

const store = configureStore({
  reducer: {
    recommend: recommendSlice,
    singers: singerSlice
  }
})

export default store
