import { Box, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import { portfolioDetailStore } from 'shared/store';
import { TransferToInvestFundForm } from './transfer-to-invest-fund-form';

const StyledModal = styled(Box)(({ theme }: any) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  minWidth: '300px',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    width: '450px',
  },
  [theme.breakpoints.down('md')]: {
    width: '65vw',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90vw',
  },
}));

export const TransferAssetToInvestFund = observer(() => {
  const { isOpenTransferToInvestFundModal } = portfolioDetailStore;

  const handleClose = () => {
    portfolioDetailStore.setOpenTransferToInvestFundModal(false);
  };

  return (
    <Box>
      <Modal
        open={isOpenTransferToInvestFundModal}
        onClose={handleClose}
        aria-labelledby="delete-asset-modal"
        aria-describedby="modal-modal-delete-asset-modal"
      >
        <StyledModal>
          <TransferToInvestFundForm />
        </StyledModal>
      </Modal>
    </Box>
  );
});
