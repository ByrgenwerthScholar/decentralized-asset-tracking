// src/components/demoPage/MainContent/TransactionItem.tsx
import React from 'react';
import { ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { Transaction } from '@shared/Transaction';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <>
      <ListItem>
        <ListItemText
          primary={`Transaction ${transaction.id}`}
          secondary={
            <>
              <Typography component="span" variant="body2" color="text.primary">
                Price:
              </Typography>{' '}
              {transaction.price} |{' '}
              <Typography component="span" variant="body2" color="text.primary">
                Amount:
              </Typography>{' '}
              {transaction.amount} |{' '}
              <Typography component="span" variant="body2" color="text.primary">
                Country:
              </Typography>{' '}
              {transaction.country} |{' '}
              <Typography component="span" variant="body2" color="text.primary">
                Time:
              </Typography>{' '}
              {transaction.timestamp}
            </>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default TransactionItem;
