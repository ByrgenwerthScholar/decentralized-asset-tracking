// src/components/OrgComponent.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Collapse, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Org, Asset, Proposal } from '../../../types/types';

interface OrgComponentProps {
  org: Org;
}

const OrgComponent: React.FC<OrgComponentProps> = ({ org }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('org.proposals:', org.proposals);
    console.log('Type of org.proposals:', typeof org.proposals);
  }, [org.proposals]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" onClick={handleClick} sx={{ cursor: 'pointer' }}>
        {org.MSP} {open ? <ExpandLess /> : <ExpandMore />}
      </Typography>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 2 }}>
          <Typography variant="subtitle1">Assets:</Typography>
          {org.assets.length === 0 ? (
            <Typography variant="body2">No assets.</Typography>
          ) : (
            <List>
              {org.assets.map((asset: Asset) => (
                <ListItem key={asset.id}>
                  <ListItemButton>
                    <ListItemText primary={`Model: ${asset.model}`} secondary={`Size: ${asset.size}`} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}

          <Typography variant="subtitle1">Proposals:</Typography>
          {org.proposals.length === 0 ? (
            <Typography variant="body2">No proposals.</Typography>
          ) : (
            <List>
              {org.proposals.map((proposal: Proposal) => (
                <ListItem key={proposal.id}>
                  <ListItemButton>
                      <ListItemText
                      primary={`Proposal ${proposal.id}`}
                      secondary={`From: ${proposal.seller} To: ${proposal.buyer}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default OrgComponent;
