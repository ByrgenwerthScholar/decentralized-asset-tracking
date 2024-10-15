import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link, Routes, Route, useParams } from 'react-router-dom';

// Define your chapters
const chapters = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'advanced-features', title: 'Advanced Features' },
  // Add more chapters as needed
];


const DocsContent: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();

  const contentMap: { [key: string]: string } = {
    introduction: 'Welcome to the Introduction of the O.W.L. Demo...',
    'getting-started': 'Getting Started with the O.W.L. Demo...',
    'advanced-features': 'Exploring Advanced Features of the O.W.L. Demo...',
    // Add more content as needed
  };

  const content = contentMap[chapterId ?? 'defaultChapterId'];

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
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: '240px',
          height: 'calc(100vh - 80px)', // Adjusted for AppBar height
          position: 'fixed',
          top: '80px', // Positioned below the AppBar
          bgcolor: 'background.paper',
          p: 2,
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
          Docs Chapters
        </Typography>
        <List>
          {chapters.map((chapter) => (
            <ListItem key={chapter.id} disablePadding>
              <ListItemButton
                component={Link}
                to={`/docs/${chapter.id}`} // Absolute path
                sx={{ color: 'white' }}
              >
                <ListItemText primary={chapter.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Docs Content */}
      <Box sx={{ flexGrow: 1, p: 3, mt: '80px', ml: '240px' }}>
        <Routes>
          <Route
            path="/"
            element={<Typography variant="h5">Select a chapter from the sidebar.</Typography>}
          />
          <Route
            path=":chapterId"
            element={<DocsContent />}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default DocsPage;
