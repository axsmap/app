import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
  entranceScore: 'any',
  interiorScore: 'any',
  restroomScore: 'any',
  allowsGuideDog: 'any',
  hasParking: 'any',
  venueType: 'establishment',
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
    setSearchFilters(state, action) {
      // state.search = action.payload.search
      state.entranceScore = action.payload.entranceScore
      state.interiorScore = action.payload.interiorScore
      state.restroomScore = action.payload.restroomScore
      state.hasParking = action.payload.hasParking
      // state.allowsGuideDog = action.payload.allowsGuideDog
      state.venueType = action.payload.venueType
    }
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
  setSearchFilters,
} = changeSearchSlice.actions

export const selectChangeSearch = (state: { changeSearch: any }) =>
  state.changeSearch

export default changeSearchSlice.reducer
