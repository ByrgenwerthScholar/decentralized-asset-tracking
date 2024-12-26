import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import OrgComponent from './OrgComponent';
import { Box, Typography } from '@mui/material';

const OrgList: React.FC = () => {
  const orgs = useSelector((state: RootState) => state.demo.context.orgs || []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Organizations
      </Typography>
      {orgs.length === 0 ? (
        <Typography variant="body1">No organizations added yet.</Typography>
      ) : (
        orgs.map((org) => <OrgComponent key={org.MSP} org={org} />)
      )}
    </Box>
  );
};

export default OrgList;
