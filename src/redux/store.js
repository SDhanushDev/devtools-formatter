import { configureStore } from '@reduxjs/toolkit';
import codeSlice from '../features/codeSlice';
import themeSlice from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    code: codeSlice,
    theme: themeSlice,
  },
});

export default store;