import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { cashDetailStore } from 'shared/store';
import { IntroSection } from './intro-section';
import { FloatingMenuButton } from './floating-menu-button';
interface IProps {
  cashId: string;
}

export const CashDetail = observer(({ cashId }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { isOpenAddNewTransactionModal, currencyCode, cashDetail } =
    cashDetailStore;

  const handleOpenModal = () => {};
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flex: '1 1 auto',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ overflow: 'hidden' }}>
          <Container sx={{ padding: isMobile ? '0px' : 'initial' }}>
            <Grid container display="flex" justifyContent="center">
              {typeof cashDetail !== 'undefined' ? (
                <IntroSection assetDetail={cashDetail} />
              ) : (
                <></>
              )}
            </Grid>
          </Container>
        </Box>
        <FloatingMenuButton event="hover" handleOnClick={handleOpenModal} />
      </Box>
    </Box>
  );
});
