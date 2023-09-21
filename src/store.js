import { configureStore } from '@reduxjs/toolkit'        // use to set redux store 

import userReducer from './slice/userSlice'
import podcastsReducer from './slice/podcastsSlice'

export const store = configureStore({
  reducer: {
      user: userReducer,
      podcasts: podcastsReducer
  },
})