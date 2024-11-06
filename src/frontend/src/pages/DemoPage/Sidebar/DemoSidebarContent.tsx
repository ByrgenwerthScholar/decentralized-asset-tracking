// DemoSidebarContent.tsx
import React from 'react';
import { Typography } from '@mui/material';
import DemoSelector from './DemoSelector';
import ControlButtons from './ControlButtons';
import ManualInputForm from './ManualInputForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const DemoSidebarContent: React.FC = () => {
  const selectedDemo = useSelector((state: RootState) => state.demo.selectedDemo);

  return (
    <>
      {/* Sidebar Title */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Controls
      </Typography>

      {/* Demo Selector */}
      <DemoSelector />

      {/* Control Buttons */}
      <ControlButtons />

      {/* Conditionally Render Input Forms Based on Selected Demo */}
      {selectedDemo === 'manual' && <ManualInputForm />}
    </>
  );
};

export default DemoSidebarContent;
