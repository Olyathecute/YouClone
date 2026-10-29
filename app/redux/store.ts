'use client'

import { configureStore } from '@reduxjs/toolkit'
import likesReducer from './likeSlice'
import modalWindowReducer from './modalWindowSlice'

export const store = configureStore({
  reducer: { likes: likesReducer, modalWindow: modalWindowReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
