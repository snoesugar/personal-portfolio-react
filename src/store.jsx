import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    temp: (state = {}) => state 
  }
});

export default store