import { Box, Modal, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { portfolioDetailStore } from 'store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

export const AddNewAssetsModal = observer(() => {
  const { isOpenAddNewAssetModal, setOpenAddNewAssetModal } =
    portfolioDetailStore;
  const handleClose = () => {
    setOpenAddNewAssetModal(false);
  };

  return (
    <div>
      <Modal
        open={isOpenAddNewAssetModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
});
