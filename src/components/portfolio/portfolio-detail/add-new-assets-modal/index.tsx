import { Box, Modal } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { portfolioDetailStore } from 'store';
import { SearchingAssetsForm } from './searching-assets-form';
import { CreateCryptoForm } from './create-crypto-form';

const StyledModal = styled(Box)(({ theme }: any) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  minWidth: '320px',
  height: '650px',
  maxHeight: '100vh',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  overflow: 'hidden',
  //boxShadow: '0 0 0 50vmax rgba(0,0,0,.5);',
  [theme.breakpoints.up('md')]: {
    minWidth: '450px',
    width: '450px',
  },
  [theme.breakpoints.down('md')]: {
    width: '70vw',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90vw',
    height: '570px',
    '@media (maxHeight: 570px)': {
      height: '100vh',
    },
  },
  '@media(maxHeight: 650px) and (minWidth:600px)': {
    height: '100vh',
  },
}));

export const AddNewAssetsModal = observer(() => {
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => {
    setCurrent(
      <SearchingAssetsForm openTransactionForm={openTransactionForm} />,
    );
  }, []);

  const { isOpenAddNewAssetModal } = portfolioDetailStore;

  const handleClose = () => {
    portfolioDetailStore.setOpenAddNewAssetModal(false);
    returnSearchingForm();
  };

  const openTransactionForm = (itemId: string) => {
    //if(itemId)
    setCurrent(<CreateCryptoForm comeBack={returnSearchingForm} />);
  };

  const returnSearchingForm = () => {
    setCurrent(
      <SearchingAssetsForm openTransactionForm={openTransactionForm} />,
    );
  };

  return (
    <Box>
      <Modal
        open={isOpenAddNewAssetModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModal>{current}</StyledModal>
      </Modal>
    </Box>
  );
});
