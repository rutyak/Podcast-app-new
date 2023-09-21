import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  imageUrl: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
     state.user = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser,setImageUrl  } = userSlice.actions;

export default userSlice.reducer