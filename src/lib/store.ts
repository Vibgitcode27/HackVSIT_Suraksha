import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './CounterSlice/counter'
import { userSlice } from './UserSlice/user'

export const makeStore = () => {
  return configureStore({
    reducer: {
        counter : counterSlice.reducer ,
        user : userSlice.reducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']