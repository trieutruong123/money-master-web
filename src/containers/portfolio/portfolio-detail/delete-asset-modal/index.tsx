import { Box, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import { portfolioDetailStore } from 'shared/store';
import { DeleteAssetForm } from './delete-asset-form';

const StyledModal = styled(Box)(({ theme }: any) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  minWidth: '220px',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    width: '400px',
  },
  [theme.breakpoints.down('md')]: {
    width: '60vw',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90vw',
  },
}));

export const DeleteAssetModal = observer(() => {
  const { isOpenDeleteAssetModal } = portfolioDetailStore;

  const handleClose = () => {
    portfolioDetailStore.setOpenDeleteAssetModal(false);
  };

  return (
    <Box>
      <Modal
        open={isOpenDeleteAssetModal}
        onClose={handleClose}
        aria-labelledby="delete-asset-modal"
        aria-describedby="modal-modal-delete-asset-modal"
      >
        <StyledModal>
          <DeleteAssetForm />
        </StyledModal>
      </Modal>
    </Box>
  );
});
