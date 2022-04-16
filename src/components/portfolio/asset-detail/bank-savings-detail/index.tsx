import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { bankSavingsDetailStore } from 'shared/store';
import { UpdatedBankSavingItem } from 'shared/types';
import { EditBankSavingsDetail } from './edit-bank-savings-detail';

interface IProps {
  portfolioId: string;
  assetId: string;
}

export const BankSavingsDetail = observer(
  ({ portfolioId, assetId }: IProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
      const fetchData = async () => {
        bankSavingsDetailStore.setAssetId(assetId);
        bankSavingsDetailStore.setPortfolioId(portfolioId);
        bankSavingsDetailStore.fetchBankSavingsDetail({ portfolioId, assetId });
      };
      fetchData();
    }, []);

    const { assetDetail } = bankSavingsDetailStore;

    const handleFormSubmit = async (data: UpdatedBankSavingItem) => {
      const res = await bankSavingsDetailStore.updateAssetDetail(data);
      return res;
    };
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
                {typeof assetDetail !== 'undefined' ? (
                  <EditBankSavingsDetail
                    assetDetail={assetDetail}
                    handleFormSubmit={handleFormSubmit}
                  />
                ) : (
                  <></>
                )}
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
    );
  },
);
