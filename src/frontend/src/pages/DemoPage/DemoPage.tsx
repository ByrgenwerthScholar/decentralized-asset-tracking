import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import TransactionList from './MainContent/TransactionList';
import { useAppSelector } from '../../store/hooks';
import selectDemoImage from '../../images/select-demo.png'; // Ensure this path is correct

const DemoPage: React.FC = () => {
  const selectedDemo = useAppSelector((state) => state.demo.selectedDemo);

  return (
    <>
      {!selectedDemo ? (
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: '100%',
          }}
        >
          <Box
            component="img"
            src={selectDemoImage} // Ensure this path is correct
            alt="Select Demo"
            sx={{
              maxWidth: '100%',
              height: '150px',
              objectFit: 'contain',
              marginBottom: '50px',
            }}
          />
          <Typography
            variant="h1"
            gutterBottom
            sx={{ color: '#888888', fontSize: '25px', marginBottom: '20px' }}
          >
            Select Demo Simulation
          </Typography>
        </Box>
      ) : (
      <TransactionList />
      )}
    </>
  );
};

export default DemoPage;

