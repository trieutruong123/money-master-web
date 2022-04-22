import { Box, Modal } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { portfolioDetailStore } from 'shared/store';
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

interface IProps {
  content: any;
}

export const AddNewAssetsModal = observer(({ content }: IProps) => {
  const [current, setCurrent] = useState<any>(null);
  const [type, setType] = useState('');
  useEffect(() => {
    setCurrent(
      <ChooseTypesForm
        content={content.chooseType}
        openNextForm={openNextForm}
      />,
    );
  }, []);

  const { isOpenAddNewAssetModal } = portfolioDetailStore;

  const handleClose = useCallback(() => {
    console.log(type);
    setType('');
    setCurrent(
      <ChooseTypesForm
        content={content.chooseType}
        openNextForm={openNextForm}
      />,
    );
    portfolioDetailStore.setOpenAddNewAssetModal(false);
  }, []);

  const openNextForm = (params: any) => {
    console.log(params.selectedType);
    switch (params.curFormType) {
      case 'type':
        setType(params.selectedType);
        if (['cryptoCurrency', 'stocks'].includes(params.selectedType))
          openSearchingForm({ assetType: params.selectedType });
        else if (
          ['realEstate', 'cash', 'bankSavings'].includes(params.selectedType)
        )
          openTransactionForm({ selectedType: params.selectedType });
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
    switch (params.curFormType) {
      case 'search':
        setCurrent(
          <ChooseTypesForm
            content={content.chooseType}
            openNextForm={openNextForm}
          />,
        );
        break;
      case 'transaction':
        if (['cryptoCurrency', 'stocks'].includes(params.selectedType))
          openSearchingForm(params);
        else if (
          ['realEstate', 'cash', 'bankSavings'].includes(params.selectedType)
        )
          openChooseTypesForm(params);
        else openChooseTypesForm(params);
        break;
      default:
        openChooseTypesForm(params);
        break;
    }
  };

  const openTransactionForm = (params: any) => {
    console.log(params.selectedType);
    switch (params.selectedType) {
      case 'cryptoCurrency':
        setCurrent(
          <AddNewCryptoForm
            content={content.cryptoTransaction}
            coinCode={params.assetId}
            selectedCoin={params.selectedItem}
            openPreviousForm={openPreviousForm}
            handleClose={handleClose}
          />,
        );
        break;
      case 'stocks':
        // const assetId = params.assetId;
        setCurrent(
          <AddNewStockForm
            content={content.stockTransaction}
            stockId={params.assetId}
            selectedStock={params.selectedItem}
            openPreviousForm={openPreviousForm}
            handleClose={handleClose}
          />,
        );
        break;
      case 'cash':
        setCurrent(
          <AddNewCashForm
            content={content.cashTransaction}
            openPreviousForm={openPreviousForm}
            handleClose={handleClose}
          />,
        );
        break;
      case 'realEstate':
        setCurrent(
          <AddNewRealEstateForm
            content={content.realEstateTransaction}
            handleClose={handleClose}
            openPreviousForm={openPreviousForm}
          />,
        );
        break;
      case 'bankSavings':
        setCurrent(
          <AddNewBankSavingsForm
            content={content.bankSavingsTransaction}
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
        content={content.searchAssets}
        assetType={params.assetType}
        openNextForm={openNextForm}
        openPreviousForm={openPreviousForm}
        searchData={searchData}
      />,
    );
  };

  const openChooseTypesForm = (params: any) => {
    setCurrent(
      <ChooseTypesForm
        content={content.chooseType}
        openNextForm={openNextForm}
      />,
    );
  };

  const searchData = async ({
    searchingText,
    searchingType,
  }: {
    searchingText: string;
    searchingType: string;
  }) => {
    const res = await portfolioDetailStore.searchData({
      type: searchingType,
      searchingText: searchingText,
    });
    return res;
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
