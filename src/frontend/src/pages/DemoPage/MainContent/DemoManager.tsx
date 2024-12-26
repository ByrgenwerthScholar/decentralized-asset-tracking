// src/components/DemoManager.tsx

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store, { RootState, AppDispatch }  from '../../../store/store';
import { demoSteps } from '../../../demos/legal/demoSteps';
import {
  setCurrentStep,
  demoError,
  setSuccess,
  stopDemo,
} from '../../../store/slices/demoSlice';
import { Box, CircularProgress, Typography } from '@mui/material';

const DemoManager: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, currentStep, context, error, success } = useSelector((state: RootState) => state.demo);
  const isMounted = useRef(true);
  const latestStatus = useRef(status);

  // Update the latestStatus ref whenever status changes
  useEffect(() => {
    latestStatus.current = status;
    console.log(`Status updated to: ${status}`);
  }, [status]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const executeDemo = async () => {
      console.log(`Starting demo execution from step index: ${currentStep}`);

      let stepIndex = currentStep;

      while (stepIndex < demoSteps.length && latestStatus.current === 'running') {
        console.log(`Executing Step ${stepIndex + 1}: ${stepDetails[stepIndex].label}`);

        // Update the current step in Redux
        dispatch(setCurrentStep(stepIndex));

        try {
          // Execute the current step
          await demoSteps[stepIndex](dispatch, store.getState);
          console.log(`Step ${stepIndex + 1} completed successfully.`);

          // Set success message
          dispatch(setSuccess(`Step ${stepIndex + 1} completed successfully.`));
        } catch (error: any) {
          // Set error message and halt the demo
          console.error(`Error in Step ${stepIndex + 1}:`, error);
          dispatch(demoError(`Step ${stepIndex + 1} failed: ${error.message}`));
          // Update latestStatus.current immediately
          latestStatus.current = 'stopped';
          break;
        }

        // Increment the step index
        stepIndex += 1;

        // Check if the demo has been paused or stopped
        if (latestStatus.current !== 'running') {
          console.log(`Demo has been ${latestStatus.current}. Halting further execution.`);
          break;
        }
      }

      // Update the Redux store with the new step index
      if (stepIndex !== currentStep) {
        dispatch(setCurrentStep(stepIndex));
      }

      // If all steps completed successfully
      if (isMounted.current && stepIndex >= demoSteps.length) {
        console.log('Demo completed successfully.');
        dispatch(setSuccess('Demo completed successfully.'));
        dispatch(stopDemo());
        latestStatus.current = 'stopped';
      }
    };

    if (status === 'running') {
      executeDemo();
    }

  }, [status]); 

  // Define step details for display
  const stepDetails = [
    { label: 'Add New Org', description: 'Adding the manufacturing Org.' },
    { label: 'Add New Asset', description: 'Adding a new asset to the blockchain.' },
    { label: 'Init Transfer Asset', description: 'Initiating transfer of the asset to another organization.' },
    { label: 'Updating Org 2', description: 'Adding a new org to the blockchain and getting all proposals.' },
    { label: 'Accept Proposal', description: 'Accepting the transfer proposal.' },
    { label: 'Update Org 2', description: 'Updating Proposal in Org 2.' },
    { label: 'Final Transfer', description: 'Completing the transfer of the asset to the buyer.' },
  ];

  return (
    <Box sx={{ p: 2 }}>
      {status === 'running' && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CircularProgress size={24} />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Demo is running...
          </Typography>
        </Box>
      )}
      {(status === 'paused' || status === 'stopped') && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          Demo is {status === 'paused' ? 'paused' : 'stopped'}.
        </Typography>
      )}
      {status === 'idle' && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          Demo is idle. Click "Start Demo" to begin.
        </Typography>
      )}
      {status !== 'idle' && currentStep < stepDetails.length && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Current Step: {currentStep + 1}</Typography>
          <Typography variant="subtitle1">{stepDetails[currentStep].label}</Typography>
          <Typography variant="body2">{stepDetails[currentStep].description}</Typography>
        </Box>
      )}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}
    </Box>
  );
};

export default DemoManager;
