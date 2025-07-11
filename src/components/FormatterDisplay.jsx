import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  Paper,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Download,
  ContentCopy,
  CheckCircle,
} from '@mui/icons-material';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

const FormatterDisplay = () => {
  const { formattedCode, selectedLanguage, lastSaved } = useSelector((state) => state.code);
  const { isDarkMode } = useSelector((state) => state.theme);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (formattedCode) {
      Prism.highlightAll();
    }
  }, [formattedCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  const handleDownload = () => {
    const fileExtension = selectedLanguage === 'javascript' ? 'js' : selectedLanguage;
    const filename = `formatted-code.${fileExtension}`;
    const blob = new Blob([formattedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getLanguageForPrism = (language) => {
    switch (language) {
      case 'javascript':
        return 'javascript';
      case 'json':
        return 'json';
      case 'html':
        return 'markup';
      case 'css':
        return 'css';
      default:
        return 'javascript';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Formatted Output
        </Typography>
        
        {lastSaved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert severity="success" sx={{ mb: 2 }}>
              Input saved successfully!
            </Alert>
          </motion.div>
        )}

        <Paper
          elevation={2}
          sx={{
            position: 'relative',
            backgroundColor: isDarkMode ? '#2d3748' : '#f7fafc',
            border: '1px solid',
            borderColor: isDarkMode ? '#4a5568' : '#e2e8f0',
            minHeight: '300px',
            mb: 2,
          }}
        >
          {formattedCode ? (
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  display: 'flex',
                  gap: 1,
                  zIndex: 1,
                }}
              >
                <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleCopy}
                    startIcon={copied ? <CheckCircle /> : <ContentCopy />}
                    sx={{
                      minWidth: 'auto',
                      backgroundColor: isDarkMode ? '#4a5568' : '#white',
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#2d3748' : '#f7fafc',
                      },
                    }}
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </Tooltip>
                
                <Tooltip title="Download as file">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleDownload}
                    startIcon={<Download />}
                    sx={{
                      minWidth: 'auto',
                      backgroundColor: isDarkMode ? '#4a5568' : '#white',
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#2d3748' : '#f7fafc',
                      },
                    }}
                  >
                    Download
                  </Button>
                </Tooltip>
              </Box>
              
              <Box
                component="pre"
                sx={{
                  margin: 0,
                  padding: 3,
                  paddingTop: 6,
                  overflow: 'auto',
                  maxHeight: '500px',
                  '& code': {
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    lineHeight: 1.5,
                  },
                }}
              >
                <code className={`language-${getLanguageForPrism(selectedLanguage)}`}>
                  {formattedCode}
                </code>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '300px',
                color: 'text.secondary',
              }}
            >
              <Typography variant="body1">
                Formatted code will appear here
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </motion.div>
  );
};

export default FormatterDisplay;