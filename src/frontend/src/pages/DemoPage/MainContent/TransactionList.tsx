import React from 'react';
import { Box, Typography, List, CircularProgress, Alert } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import TransactionItem from './TransactionItem';


const TransactionList: React.FC = () => {
  const { transactions, loading, error } = useAppSelector((state) => state.transactions);
  const selectedDemo = useAppSelector((state) => state.demo.selectedDemo);

  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Blockchain Transactions
      </Typography>

      {/* Show Loading Spinner */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Show Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Display Message if No Transactions */}
      {!loading && !error && transactions.length === 0 && (
        <Typography variant="body1">No transactions available.</Typography>
      )}

      {/* Display Transactions */}
      {!loading && !error && transactions.length > 0 && (
        <List>
          {transactions.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default TransactionList;
