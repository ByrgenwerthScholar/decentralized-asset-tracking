// src/components/demoPage/Sidebar/DemoSelector.tsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { selectDemo } from '../../../store/slices/demoSlice';
import { RootState } from '../../../store/store';

const demos = [
  { id: 'manual', label: 'Manual Demo' },
  { id: 'legal', label: 'Legal Demo' },
  // Add more demos as needed
];

const DemoSelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDemo = useSelector((state: RootState) => state.demo.selectedDemo);

  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(selectDemo(event.target.value));
  };

  return (
    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
      <InputLabel id="demo-select-label">Select Demo</InputLabel>
      <Select
        labelId="demo-select-label"
        id="demo-select"
        value={selectedDemo}
        label="Select Demo"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {demos.map((demo) => (
          <MenuItem key={demo.id} value={demo.id}>
            {demo.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DemoSelector;
