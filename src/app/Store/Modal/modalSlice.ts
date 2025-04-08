import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modal: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.modal = true
        },
        closeModal: (state) => {
            state.modal = false
        },
    },
})
const { actions, reducer } = modalSlice

export const { openModal, closeModal } = actions

export default reducer
