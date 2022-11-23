import { configureStore } from '@reduxjs/toolkit'
import feedReducer from './feedSlice';
import openModal2 from './modal2';
import userSlice from './userSlice';
import refreshSLice from './refreshSLice';
import getChatSlice from './getChatSlice';
import socketSlice from './socketSlice';
import progressSlice from './progressSlice';

export default configureStore({
  reducer: {
    openModal: feedReducer,
    openModal2,
    userReducer:userSlice,
    refresh:refreshSLice,
    getChat:getChatSlice,
    socket:socketSlice,
    progress:progressSlice
  }
})