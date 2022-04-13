import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { realEstateDetailStore } from 'shared/store';
import { UpdatedRealEstateItem } from 'shared/types';
import { EditRealEstateDetail } from './edit-real-estate-detail';

interface IProps {
  portfolioId: string;
  assetId: string;
}

export const RealEstateDetail = observer(({ portfolioId, assetId }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    realEstateDetailStore.setAssetId(assetId);
    realEstateDetailStore.setPortfolioId(portfolioId);
    realEstateDetailStore.fetchRealEstateDetail({ portfolioId, assetId });
  }, []);

  const { assetDetail } = realEstateDetailStore;

  const handleFormSubmit = async (data: UpdatedRealEstateItem) => {
    const res = await realEstateDetailStore.updateAssetDetail(data);
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
                <EditRealEstateDetail
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
});
