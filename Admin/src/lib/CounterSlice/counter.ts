import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number,
  api: any
}

const initialState: CounterState = {
  value: 0,
  api: {}
}

export const fetchApiData = createAsyncThunk("fetchApiData", async () => {
  let result = await fetch("https://jsonplaceholder.typicode.com/todos/1")
  result = await result.json()
  return result;
})

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApiData.fulfilled, (state, action) => {
      state.api = action.payload
    })
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer;