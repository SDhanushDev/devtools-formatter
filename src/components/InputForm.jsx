import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  FormatAlignLeft,
  Clear,
  Save,
  FolderOpen,
  SettingsSuggest,
} from '@mui/icons-material';
import {
  setInputCode,
  setSelectedLanguage,
  setIsFormatting,
  setFormattedCode,
  setError,
  clearError,
  setLastSaved,
} from '../features/codeSlice';
import { detectSyntax, saveToLocalStorage, loadFromLocalStorage } from '../utils/detectSyntax';
import { formatJSON, formatJavaScript, formatHTML, formatCSS } from '../utils/formatJSON';

const InputForm = () => {
  const dispatch = useDispatch();
  const { inputCode, selectedLanguage, isFormatting, error } = useSelector((state) => state.code);

  useEffect(() => {
    // Load saved input on component mount
    const savedData = loadFromLocalStorage('devtools-saved-input');
    if (savedData) {
      dispatch(setInputCode(savedData.inputCode || ''));
      dispatch(setSelectedLanguage(savedData.selectedLanguage || 'json'));
    }
  }, [dispatch]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    dispatch(setInputCode(value));
    dispatch(clearError());
  };

  const handleLanguageChange = (event) => {
    dispatch(setSelectedLanguage(event.target.value));
  };

  const handleAutoDetect = () => {
    if (inputCode.trim()) {
      const detectedLanguage = detectSyntax(inputCode);
      dispatch(setSelectedLanguage(detectedLanguage));
    }
  };

  const handleFormat = async () => {
    if (!inputCode.trim()) {
      dispatch(setError('Please enter some code to format'));
      return;
    }

    dispatch(setIsFormatting(true));
    dispatch(clearError());

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing time
      
      let result;
      switch (selectedLanguage) {
        case 'json':
          result = formatJSON(inputCode);
          break;
        case 'javascript':
          result = formatJavaScript(inputCode);
          break;
        case 'html':
          result = formatHTML(inputCode);
          break;
        case 'css':
          result = formatCSS(inputCode);
          break;
        default:
          result = { formatted: inputCode, error: null };
      }

      if (result.error) {
        dispatch(setError(result.error));
        dispatch(setFormattedCode(''));
      } else {
        dispatch(setFormattedCode(result.formatted));
        dispatch(setError(null));
      }
    } catch (error) {
      dispatch(setError(`Formatting error: ${error.message}`));
    } finally {
      dispatch(setIsFormatting(false));
    }
  };

  const handleClear = () => {
    dispatch(setInputCode(''));
    dispatch(setFormattedCode(''));
    dispatch(clearError());
  };

  const handleSave = () => {
    const dataToSave = {
      inputCode,
      selectedLanguage,
      savedAt: new Date().toISOString(),
    };
    
    saveToLocalStorage('devtools-saved-input', dataToSave);
    dispatch(setLastSaved(new Date().toISOString()));
    
    // Show success message briefly
    setTimeout(() => {
      dispatch(setLastSaved(null));
    }, 3000);
  };

  const handleLoad = () => {
    const savedData = loadFromLocalStorage('devtools-saved-input');
    if (savedData) {
      dispatch(setInputCode(savedData.inputCode || ''));
      dispatch(setSelectedLanguage(savedData.selectedLanguage || 'json'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Input Code
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              label="Language"
            >
              <MenuItem value="json">JSON</MenuItem>
              <MenuItem value="javascript">JavaScript</MenuItem>
              <MenuItem value="html">HTML</MenuItem>
              <MenuItem value="css">CSS</MenuItem>
            </Select>
          </FormControl>
          
          <Tooltip title="Auto-detect language">
            <Button
              variant="outlined"
              size="small"
              onClick={handleAutoDetect}
              startIcon={<SettingsSuggest />}
            >
              Auto Detect
            </Button>
          </Tooltip>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={12}
          variant="outlined"
          placeholder="Paste your code here..."
          value={inputCode}
          onChange={handleInputChange}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              fontFamily: 'monospace',
              fontSize: '14px',
            },
          }}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </motion.div>
        )}

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={handleFormat}
            disabled={isFormatting}
            startIcon={<FormatAlignLeft />}
          >
            {isFormatting ? 'Formatting...' : 'Format Code'}
          </Button>
          
          <Button
            variant="outlined"
            onClick={handleClear}
            startIcon={<Clear />}
          >
            Clear
          </Button>
          
          <Button
            variant="outlined"
            onClick={handleSave}
            startIcon={<Save />}
          >
            Save
          </Button>
          
          <Button
            variant="outlined"
            onClick={handleLoad}
            startIcon={<FolderOpen />}
          >
            Load
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default InputForm;