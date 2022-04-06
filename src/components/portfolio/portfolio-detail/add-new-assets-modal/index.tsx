import { Box, Modal } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { portfolioDetailStore } from 'store';
import { SearchingAssetsForm } from './searching-assets-form';
import { ChooseTypesForm } from './choose-types-form';
import {
  AddNewCryptoForm,
  AddNewStockForm,
  AddNewCashForm,
  AddNewRealEstateForm,
  AddNewBankSavingsForm,
} from './add-asset-forms';

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
  const [type, setType] = useState('');
  useEffect(() => {
    setCurrent(<ChooseTypesForm openNextForm={openNextForm} />);
  }, []);

  useEffect(() => {
    console.log(type);
    console.log(portfolioDetailStore.isOpenAddNewAssetModal);
  }, [type, portfolioDetailStore.isOpenAddNewAssetModal]);
  const { isOpenAddNewAssetModal } = portfolioDetailStore;

  const handleClose = useCallback(() => {
    setType('');
    setCurrent(<ChooseTypesForm openNextForm={openNextForm} />);
    portfolioDetailStore.setOpenAddNewAssetModal(false);
  }, []);

  const openNextForm = (params: any) => {
    switch (params.curFormType) {
      case 'type':
        setType(params.selectedType);
        if (['cryptoCurrency', 'stocks'].includes(params.selectedType))
          openSearchingForm(params);
        else if (
          ['realEstate', 'cash', 'bankSavings'].includes(params.selectedType)
        )
          openTransactionForm(params);
        break;
      case 'search':
        openTransactionForm(params);
        break;
      default:
        openChooseTypesForm(params);
        break;
    }
  };

  const openPreviousForm = (params: any) => {
    console.log(type);
    switch (params.curFormType) {
      case 'search':
        setCurrent(<ChooseTypesForm openNextForm={openNextForm} />);
        break;
      case 'transaction':
        if (['cryptoCurrency', 'stocks'].includes(type))
          openSearchingForm(params);
        else if (['realEstate', 'cash', 'bankSavings'].includes(type))
          openChooseTypesForm(params);
        else openChooseTypesForm(params);
        break;
      default:
        openChooseTypesForm(params);
        break;
    }
  };

  const openTransactionForm = (params: any) => {
    switch (params.selectedType) {
      case 'cryptoCurrency':
        // const assetId = params.assetId;
        setCurrent(<AddNewCryptoForm openPreviousForm={openPreviousForm} />);
        break;
      case 'stocks':
        // const assetId = params.assetId;
        setCurrent(<AddNewStockForm openPreviousForm={openPreviousForm} />);
        break;
      case 'cash':
        setCurrent(<AddNewCashForm openPreviousForm={openPreviousForm} />);
        break;
      case 'realEstate':
        setCurrent(
          <AddNewRealEstateForm
            handleClose={handleClose}
            openPreviousForm={openPreviousForm}
          />,
        );
        break;
      case 'bankSavings':
        setCurrent(
          <AddNewBankSavingsForm
            handleClose={handleClose}
            openPreviousForm={openPreviousForm}
          />,
        );
        break;
    }
  };

  const openSearchingForm = (params: any) => {
    setCurrent(
      <SearchingAssetsForm
        openNextForm={openNextForm}
        openPreviousForm={openPreviousForm}
      />,
    );
  };

  const openChooseTypesForm = (params: any) => {
    setCurrent(<ChooseTypesForm openNextForm={openNextForm} />);
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
