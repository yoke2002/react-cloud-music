import { configureStore } from '@reduxjs/toolkit'
import recommendSlice from '../application/Recommend/recommendSlice'
import singerSlice from '../application/Singers/singerSlice'
import rankSlice from '../application/Rank/rankSlice'

const store = configureStore({
  reducer: {
    recommend: recommendSlice,
    singers: singerSlice,
    rank: rankSlice
  }
})

export default store
