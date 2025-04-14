import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
  entranceScore: 'any',
  interiorScore: 'any',
  restroomScore: 'any',
  allowsGuideDog: 'any',
  hasParking: 'any',
  venueType: 'all',
}

const changeSearchSlice = createSlice({
  name: 'changeSearch',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload
    },
    setEntranceScore(state, action) {
      state.entranceScore = action.payload
    },
    setInteriorScore(state, action) {
      state.interiorScore = action.payload
    },
    setRestroomScore(state, action) {
      state.restroomScore = action.payload
    },
    setAllowsGuideDog(state, action) {
      state.allowsGuideDog = action.payload
    },
    setHasParking(state, action) {
      state.hasParking = action.payload
    },
    setVenueType(state, action) {
      state.venueType = action.payload
    },
  },
})

export const {
  setSearch,
  setEntranceScore,
  setInteriorScore,
  setRestroomScore,
  setAllowsGuideDog,
  setHasParking,
  setVenueType,
} = changeSearchSlice.actions

export const selectChangeSearch = (state: { changeSearch: any }) =>
  state.changeSearch

export default changeSearchSlice.reducer
