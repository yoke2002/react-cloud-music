import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBannerRequest, getRecommendListRequest } from '../../api/request'

const initialState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true
}

export const getBannerList = createAsyncThunk(
  'recommend/getBanners',
  async () => {
    try {
      const data = await getBannerRequest()
      return data.banners
    } catch (error) {
      console.log('轮播图数据传输错误', error)
    }
  }
)

export const getRecommendList = createAsyncThunk(
  'recommend/getRecommendList',
  async () => {
    try {
      const data = await getRecommendListRequest()
      return data.result
    } catch (error) {
      console.log('推荐歌单数据传输错误', error)
    }
  }
)

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBannerList.fulfilled, (state, action) => {
        state.bannerList = action.payload
      })
      .addCase(getRecommendList.fulfilled, (state, action) => {
        state.recommendList = action.payload
        state.enterLoading = false
      })
  }
})

export default recommendSlice.reducer
