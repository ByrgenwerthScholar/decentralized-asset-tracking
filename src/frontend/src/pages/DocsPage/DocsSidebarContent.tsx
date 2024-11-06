// src/components/docsPage/Sidebar/DocsSidebarContent.tsx
import React from 'react';
import { Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { selectDoc } from '../../store/slices/docsSlice';

const DocsSidebarContent: React.FC = () => {
  const selectedDoc = useSelector((state: RootState) => state.docs.selectedDoc);
  const dispatch = useDispatch();

  const chapters = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'advanced-features', title: 'Advanced Features' },
    // Add more chapters as needed
  ];

  const handleChapterClick = (chapter: string) => {
    dispatch(selectDoc(chapter));
  };

  return (
    <>
      <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
        Docs Chapters
      </Typography>
      <List>
        {chapters.map((chapter) => (
          <ListItemButton
            key={chapter.id}
            selected={selectedDoc === chapter.id}
            onClick={() => handleChapterClick(chapter.id)}
          >
            <ListItemText primary={chapter.title} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default DocsSidebarContent;
