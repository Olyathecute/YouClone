'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalWindowState {
  modalWindowIsOpen: boolean
}

const initialState: ModalWindowState = {
  modalWindowIsOpen: false,
}

const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    closeModalWindow: (state) => {
      state.modalWindowIsOpen = false
    },
    openModalWindow: (state) => {
      state.modalWindowIsOpen = true
    },
  },
})

export const { closeModalWindow, openModalWindow } = modalWindowSlice.actions

export default modalWindowSlice.reducer
