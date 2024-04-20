import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  username : string,
}

const initialState: UserState = {
    username: "admin",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sign: (state , action) => {
      state.username = action.payload.email
    }
  }
})

export const { sign } = userSlice.actions

export default userSlice.reducer;