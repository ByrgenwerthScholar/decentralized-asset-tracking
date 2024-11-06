import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const DocsContent: React.FC = () => {
  const selectedDoc = useSelector ((state: RootState) => state.docs.selectedDoc);

  const contentMap: { [key: string]: string } = {
    'introduction': 'Welcome to the Introduction of the O.W.L. Demo...',
    'getting-started': 'Getting Started with the O.W.L. Demo...',
    'advanced-features': 'Exploring Advanced Features of the O.W.L. Demo...',

  };

  const content = contentMap[selectedDoc ?? 'introduction'];

  if (!content) {
    return <Typography variant="h6">Chapter not found.</Typography>;
  }

  return (
    <Typography variant="body1">
      {content}
    </Typography>
  );
};

const DocsPage: React.FC = () => {
  const selectedDoc = useSelector ((state: RootState) => state.docs.selectedDoc);
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      
      {/* Docs Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <DocsContent />
      </Box>
    </Box>
  );
};

export default DocsPage;
