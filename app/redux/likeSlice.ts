'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LikesState {
  likedVideoIds: number[]
}

const initialState: LikesState = {
  likedVideoIds: [],
}

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    addLike: (state, action: PayloadAction<number>) => {
      if (!state.likedVideoIds.includes(action.payload)) {
        state.likedVideoIds.push(action.payload)
      }
    },

    removeLike: (state, action: PayloadAction<number>) => {
      state.likedVideoIds = state.likedVideoIds.filter((id) => id !== action.payload)
    },
  },
})

export const { addLike, removeLike } = likesSlice.actions

export default likesSlice.reducer
