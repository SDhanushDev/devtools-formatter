import React from 'react';
import { motion } from 'framer-motion';
import { Container, Grid, Box, Typography } from '@mui/material';
import InputForm from '../components/InputForm';
import FormatterDisplay from '../components/FormatterDisplay';

const Home = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Code Formatter & JSON Viewer
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Format and beautify your JSON, JavaScript, HTML, and CSS code with syntax highlighting
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <InputForm />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormatterDisplay />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;