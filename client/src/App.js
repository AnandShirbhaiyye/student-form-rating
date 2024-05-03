import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import Rating from '@mui/lab/Rating';

const App = () => {
  const [formData, setFormData] = useState({ name: '', age: '', grade: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:4000/api/students', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = async () => {
    if (rating > 0) {
      try {
        await axios.post('http://localhost:4000/api/ratings', { rating });
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    }
    setIsSubmitted(false);
  };

  return (
    <Container maxWidth="sm" style={{ paddingTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Student Form
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Grade"
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: '1rem' }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      <Dialog open={isSubmitted} onClose={handleClose}>
        <DialogTitle>Form Submitted!</DialogTitle>
        <DialogContent>
          <Typography>
            How would you rate your experience?
          </Typography>
          <Rating
            name="experience-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
