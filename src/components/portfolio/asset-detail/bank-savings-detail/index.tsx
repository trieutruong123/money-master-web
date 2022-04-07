import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import {bankSavingsDetailStore} from 'store';
import { EditBankSavingsDetail } from './edit-bank-savings-detail';

export const BankSavingsDetail = observer(() => {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
            <Grid container display="flex" justifyContent="center" >
              <EditBankSavingsDetail/>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
});
