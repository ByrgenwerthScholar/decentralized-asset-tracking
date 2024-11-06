// src/components/demoPage/Sidebar/ManualInputForm.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../../store/slices/transactionSlice';
import { v4 as uuidv4 } from 'uuid';

const ManualInputForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    price: '',
    amount: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { price, amount, country } = formData;
    if (price && amount && country) {
      const newTransaction = {
        id: uuidv4(),
        price: parseFloat(price),
        amount: parseFloat(amount),
        country,
        timestamp: new Date().toLocaleString(),
      };
      dispatch(addTransaction(newTransaction));
      setFormData({ price: '', amount: '', country: '' });
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Manual Transaction
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        {/* Add more input fields as needed */}
      </Grid>
      <Button
        variant="outlined"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}
      >
        Add Transaction
      </Button>
    </Box>
  );
};

export default ManualInputForm;
