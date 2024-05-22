import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRankListRequest } from '../../api/request'

export const getRankList = createAsyncThunk('rank/getRankList', async () => {
  const res = await getRankListRequest()
  return res && res.list
})

export const rankSlice = createSlice({
  name: 'rank',
  initialState: {
    rankList: [],
    loading: true
  },
  extraReducers: (builder) => {
    builder.addCase(getRankList.fulfilled, (state, action) => {
      state.loading = false
      state.rankList = action.payload
    })
  }
})

export default rankSlice.reducer
