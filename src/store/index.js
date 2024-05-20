import { configureStore } from '@reduxjs/toolkit'
import recommendSlice from '../application/Recommend/recommendSlice'

const store = configureStore({
  reducer: {
    recommend: recommendSlice
  }
})

export default store
