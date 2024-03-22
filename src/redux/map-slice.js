import { createSlice } from '@reduxjs/toolkit'

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    pinElement: {
      title: null,
      longitude: null,
      latitude: null
    }
  },
  reducers: {
    setPinElement: (state, action) => {
      state.pinElement = action.payload
    }
  }
})

export const { setPinElement } = mapSlice.actions

export default mapSlice.reducer
