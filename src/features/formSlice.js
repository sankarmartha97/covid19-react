import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
  name: 'formData',
  initialState: {
    value: {
        headers:[],
        body:[],
    },
  },
  reducers: {
    addHeader: (state,action) => {
      state.value.headers.push(action.payload)
    },
   
  },
})

// Action creators are generated for each case reducer function
export const {addHeader} = formSlice.actions

export default formSlice.reducer