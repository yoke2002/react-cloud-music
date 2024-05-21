import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getHotSingerListRequest,
  getSingerListRequest
} from '../../api/request'

const initialState = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0
}

export const getHotSingerList = createAsyncThunk(
  'singers/getHotSingerList',
  async () => {
    try {
      const res = await getHotSingerListRequest(0)
      return res.artists
    } catch (error) {
      console.log('热门歌手数据获取失败', error)
    }
  }
)

export const refreshMoreHotSingerList = createAsyncThunk(
  'singers/refreshMoreHotSingerList',
  async (arg, { getState }) => {
    try {
      const { pageCount, singerList } = getState().singers
      const res = await getHotSingerListRequest(pageCount)
      return [...singerList, ...res.artists]
    } catch (error) {
      console.log('热门歌手数据获取失败', error)
    }
  }
)

export const getSingerList = createAsyncThunk(
  'singers/getSingerList',
  async ({ category, alpha }) => {
    try {
      const res = await getSingerListRequest(category, alpha, 0)
      return res.artists
    } catch (error) {
      console.log('歌手数据获取失败', error)
    }
  }
)

export const refreshMoreSingerList = createAsyncThunk(
  'singers/refreshMoreSingerList',
  async ({ category, alpha }, { getState }) => {
    const { singerList, pageCount } = getState().singers
    try {
      const res = await getSingerListRequest(category, alpha, pageCount)
      return [...singerList, ...res.artists]
    } catch (error) {
      console.log('歌手数据获取失败')
      return error
    }
  }
)

export const singerSlice = createSlice({
  name: 'singers',
  initialState,
  reducers: {
    changeEnterLoading: (state, action) => {
      state.enterLoading = action.payload
    },
    changePullUpLoading: (state, action) => {
      state.pullUpLoading = action.payload
    },
    changePullDownLoading: (state, action) => {
      state.pullDownLoading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotSingerList.pending, (state) => {
        // state.enterLoading = true
        state.pageCount = 0
      })
      .addCase(getHotSingerList.fulfilled, (state, action) => {
        state.singerList = action.payload
        state.pullDownLoading = false
        state.enterLoading = false
      })
      .addCase(refreshMoreHotSingerList.pending, (state) => {
        // state.pullUpLoading = true
        state.pageCount += 1
      })
      .addCase(refreshMoreHotSingerList.fulfilled, (state, action) => {
        state.singerList = action.payload
        state.pullUpLoading = false
      })
      .addCase(getSingerList.pending, (state) => {
        // state.enterLoading = true
        state.pageCount = 0
      })
      .addCase(getSingerList.fulfilled, (state, action) => {
        state.singerList = action.payload
        state.pullDownLoading = false
        state.enterLoading = false
      })
      .addCase(refreshMoreSingerList.pending, (state) => {
        // state.pullUpLoading = true
        state.pageCount += 1
      })
      .addCase(refreshMoreSingerList.fulfilled, (state, action) => {
        state.singerList = action.payload
        state.pullUpLoading = false
      })
  }
})

export const {
  changeEnterLoading,
  changePullDownLoading,
  changePullUpLoading
} = singerSlice.actions

export default singerSlice.reducer
