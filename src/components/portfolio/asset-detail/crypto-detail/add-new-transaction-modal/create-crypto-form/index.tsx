import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BuyCryptoForm } from './buy-cryto-form';
import { SellCryptoForm } from './sell-crypto-form';

interface IProps {
}

export const CreateCryptoForm = observer(({}: IProps) => {
  const theme = useTheme();
  const [focusedButtonKey, setFocusedButtonKey] = useState(0);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [assetPrice, setAssetPrice] = useState(0);

  useEffect(() => {
    const fetchAssetPrice = async () => {};
    fetchAssetPrice();
    setSelectedForm(<BuyCryptoForm key={focusedButtonKey} handleFormSubmit />);
  }, []);

  const buttonLabels = ['Buy', 'Sell', 'Dividend'];
  const formArray = [
    <BuyCryptoForm key={focusedButtonKey} handleFormSubmit />,
    <SellCryptoForm key={focusedButtonKey} handleFormSubmit />,
  ];
  const handleSelectionChanged = (key: number) => {
    setFocusedButtonKey(key);
    setSelectedForm(formArray[key]);
  };

  const portfolioName = 'demo portoflio';
  const assetName = 'Ethereum';

  const handleFormSubmit = async (data: any) => {};

  return (
    <Box sx={{ height: 'inherit' }}>
      <Box sx={{ mt: '1rem' }}>
        <Typography align="center" id="modal-modal-title" variant="h4">
          Transaction
        </Typography>
      </Box>
      <Box sx={{ ml: '3rem', mt: '1rem' }}>
        <ButtonGroup aria-label="outlined primary button group">
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
        <Typography
          variant="body1"
          sx={{
            mt: '0.4rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {portfolioName}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
        >
          {assetName}
        </Typography>
      </Box>
      <Box
        sx={{
          [theme.breakpoints.down('sm')]: { height: '410px' },

          [theme.breakpoints.up('sm')]: {
            height: '480px',
          },
        }}
      >
        {selectedForm}
      </Box>
    </Box>
  );
});
