import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  email: string,
  firstname: string,
  lastname : string
}

const initialState: UserState = {
    email: "",
    firstname: "",
    lastname : ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sign: (state , action) => {
      state.email = action.payload.email
      state.firstname = action.payload.firstname
      state.lastname = action.payload.lastname
    }
  }
})

export const { sign } = userSlice.actions

export default userSlice.reducer;