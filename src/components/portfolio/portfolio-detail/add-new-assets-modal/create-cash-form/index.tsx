import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
export const CreateCashForm = () => {
  const buttonLabels = ['Buy', 'Sell', 'Divident'];
  const [focusedButtonKey, setFocusedButtonKey] = useState(1);
  const handleComeback = () => {};

  const handleSelectionChanged = (key: number) => {
    setFocusedButtonKey(key);
  };


  return (
    <Box>
      <Box display="flex" flexDirection="row" alignItems="start">
        <IconButton onClick={handleComeback}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          id="modal-modal-title"
          variant="h4"
          align="center"
          mt="1rem"
        >
          Transaction
        </Typography>
      </Box>
      <Box>
        <ButtonGroup
          aria-label="outlined primary button group"
        >
          {buttonLabels.map((item: string, key: number) => {
            return (
              <Button
                key={key.toString()}
                variant={key === focusedButtonKey ? 'contained' : 'outlined'}
                onClick={() => handleSelectionChanged(key)}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>
    </Box>
  );
};
