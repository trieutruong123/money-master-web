import { observer } from 'mobx-react-lite';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  ButtonProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { FcDeleteRow } from 'react-icons/fc';
import { portfolioDetailStore } from 'shared/store';
import { AssetTypeName } from 'shared/constants';

const CancelButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'ffffff',
  backgroundColor: grey[400],
  '&:hover': {
    backgroundColor: grey[500],
  },
}));

export const DeleteAssetForm = observer(() => {
  const theme = useTheme();

  const { deletedAssetInfo } = portfolioDetailStore;
  const deletedAssetDetail = portfolioDetailStore.findAssetByIdAndType(
    deletedAssetInfo?.assetType || AssetTypeName.others,
    deletedAssetInfo?.assetId || -1,
  );

  const handleCloseModal = () => {
    portfolioDetailStore.setOpenDeleteAssetModal(false);
  };

  const handleDeleteAsset = () => {
    portfolioDetailStore.deleteAsset();
    portfolioDetailStore.setOpenDeleteAssetModal(false);
  };

  return (
    <Box
      id="delete-asset-form"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: '3rem',
        py: '1rem',
        [theme.breakpoints.down('xs')]: {
          px: '2rem',
        },
      }}
    >
      <FcDeleteRow size={100} />
      <h2>Delete {deletedAssetDetail?.name}</h2>
      <Typography sx={{ color: 'appColor.gray' }}>
        Are you sure you want to delete {deletedAssetDetail?.name}?
      </Typography>
      <Typography sx={{ color: 'appColor.gray' }}>
        Once deleted they cannot be reversed.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          pt: '1rem',
          width: '100%',
        }}
      >
        <CancelButton
          variant="contained"
          onClick={handleCloseModal}
          color="warning"
          sx={{
            bg: 'appColor.theme',
            fontSize: '1.4rem',
            height: '2.5rem',
          }}
        >
          Cancel
        </CancelButton>
        <Box sx={{ flexGrow: '0.5' }} />
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteAsset}
          sx={{
            fontSize: '1.4rem',
            height: '2.5rem',
          }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
});
