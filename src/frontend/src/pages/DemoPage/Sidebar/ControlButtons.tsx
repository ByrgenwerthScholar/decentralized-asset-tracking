// src/components/demoPage/Sidebar/ControlButtons.tsx
import React from 'react';
import { Box, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { useDispatch, useSelector } from 'react-redux';
import { startDemo, pauseDemo, stopDemo, resumeDemo } from '../../../store/slices/demoSlice';
import { RootState } from '../../../store/store';

const ControlButtons: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.demo.status);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        onClick={() => {
          if (status === 'paused') {
            dispatch(resumeDemo());
          } else {
            dispatch(startDemo());
          }
        }}
        disabled={status === 'running'}
        sx={{ mb: 1, bgcolor: 'primary.light' }}
      >
        {status === 'paused' ? 'Resume Demo' : 'Start Demo'}
      </Button>
      <Button
        variant="contained"
        startIcon={<PauseIcon />}
        onClick={() => dispatch(pauseDemo())}
        disabled={status !== 'running'}
        sx={{ mb: 1 }}
      >
        Pause
      </Button>
      <Button
        variant="contained"
        startIcon={<StopIcon />}
        onClick={() => dispatch(stopDemo())}
        disabled={status === 'idle' || status === 'stopped'}
      >
        Stop
      </Button>
    </Box>
  );
};

export default ControlButtons;
