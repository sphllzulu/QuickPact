import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { Description as DescriptionIcon, Edit as EditIcon, Download as DownloadIcon } from '@mui/icons-material';

const Instructions = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>How to Use the Contract Generator</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Simple Steps to Create Your Contract:
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="1. Select Contract Type"
              secondary="Choose from various contract templates like Roommate Agreement, Freelancer Contract, etc."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <EditIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="2. Describe Your Agreement"
              secondary="Provide details about the parties involved, amounts, dates, and specific terms."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <DownloadIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="3. Generate & Download"
              secondary="Review the generated contract, make any edits, and download as PDF."
            />
          </ListItem>
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Tips for Best Results:
        </Typography>
        <Typography variant="body2" paragraph>
          • Include full names of all parties involved
        </Typography>
        <Typography variant="body2" paragraph>
          • Specify exact amounts and payment terms
        </Typography>
        <Typography variant="body2" paragraph>
          • Mention important dates (start date, end date if applicable)
        </Typography>
        <Typography variant="body2" paragraph>
          • For roommate agreements, include the total rent and number of roommates
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Got It!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Instructions;