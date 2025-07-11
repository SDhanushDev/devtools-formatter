import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputCode: '',
  formattedCode: '',
  selectedLanguage: 'json',
  isFormatting: false,
  error: null,
  lastSaved: null,
};

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setInputCode: (state, action) => {
      state.inputCode = action.payload;
    },
    setFormattedCode: (state, action) => {
      state.formattedCode = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setIsFormatting: (state, action) => {
      state.isFormatting = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLastSaved: (state, action) => {
      state.lastSaved = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setInputCode,
  setFormattedCode,
  setSelectedLanguage,
  setIsFormatting,
  setError,
  setLastSaved,
  clearError,
} = codeSlice.actions;

export default codeSlice.reducer;