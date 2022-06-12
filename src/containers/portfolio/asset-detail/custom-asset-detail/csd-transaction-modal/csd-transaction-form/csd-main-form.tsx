import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { customAssetsDetailStore } from 'shared/store';
import { ITransactionRequest, TransferToInvestFundType } from 'shared/types';
import CSDSellForm from './csd-sell-form';
import CSDWithdrawToOutside from './csd-withdraw-outside-form';
import CSDTransferToFundForm from './csd-transfer-to-fund-form';
import { content as i18n } from 'i18n';
import { useRouter } from 'next/router';


interface IProps { }


const CSDMainForm = observer(({ }: IProps) => {
    const router = useRouter();
    const { locale, query } = router;
    const content = locale === 'vi' ? i18n['vi'].customAssetDetailPage : i18n['en'].customAssetDetailPage;

    const theme = useTheme();
    const [focusedButtonKey, setFocusedButtonKey] = useState(0);
    const [selectedForm, setSelectedForm] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const fetchAssetPrice = async () => { };
        fetchAssetPrice();
        setSelectedForm(
            <CSDSellForm content={content} key={focusedButtonKey} handleFormSubmit={sellAsset} />,
        );
    }, []);

    const buttonLabels = [content.transactionForm.sell, content.transactionForm.transfer, content.transactionForm.withdraw];

    const handleSelectionChanged = (key: number) => {
        setFocusedButtonKey(key);
        setErrorMessage('');
        setSelectedForm(formArray[key]);
    };

    const portfolioName = customAssetsDetailStore.portfolioInfo?.name;
    const assetName = customAssetsDetailStore.customAssetDetail?.name;

    const handleClose = () => {
        customAssetsDetailStore.setOpenAddNewTransactionModal(false);
    };

    const sellAsset = async (payload: ITransactionRequest) => {
        const res = await customAssetsDetailStore.createNewTransaction(payload);
        if (res.isError) {
            setErrorMessage(res.data.data);
        } else {
            customAssetsDetailStore.setUpdateOverviewData(true);
            handleClose();
        }
    };

    const moveToFund = async (payload: TransferToInvestFundType) => {
        const res = await customAssetsDetailStore.transferAssetToInvestFund(payload);
        if (res.isError) {
            setErrorMessage(res.data.data);
        } else {
            customAssetsDetailStore.setUpdateOverviewData(true);
            handleClose();
        }
    };

    const withdrawValue = async (payload: ITransactionRequest) => {
        const res = await customAssetsDetailStore.createNewTransaction(payload);
        if (res.isError) {
            setErrorMessage(res.data.data);
        } else {
            customAssetsDetailStore.setUpdateOverviewData(true);
            handleClose();
        }
    }

    const formArray = [
        <CSDSellForm content={content} key={focusedButtonKey} handleFormSubmit={sellAsset} />,
        <CSDTransferToFundForm content={content} key={focusedButtonKey} handleFormSubmit={moveToFund} />,
        <CSDWithdrawToOutside content={content} key={focusedButtonKey} handleFormSubmit={withdrawValue} />
    ];

    return (
        <Box sx={{ height: 'inherit' }}>
            <Box sx={{ mt: '1rem' }}>
                <Typography align="center" id="modal-modal-title" variant="h4">
                    {content.transactionForm.title}
                </Typography>
            </Box>
            <Box sx={{ ml: '3rem', mt: '1rem' }}>
                <ButtonGroup aria-label="outlined primary button group">
                    {buttonLabels.map((item: string, key: number) => {
                        return (
                            <Button
                                key={key.toString()}
                                variant={key === focusedButtonKey ? 'contained' : 'outlined'}
                                onClick={() => handleSelectionChanged(key)}
                            >
                                {item}
                            </Button>
                        );
                    })}
                </ButtonGroup>
                <Typography
                    variant="body1"
                    sx={{
                        mt: '0.4rem',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                    }}
                >
                    {portfolioName}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                    {assetName}
                </Typography>
            </Box>
            <Typography variant="body1" color="error" align="center" height="1.5rem">
                {errorMessage}
            </Typography>
            <Box
                sx={{
                    [theme.breakpoints.down('sm')]: { height: '390px' },
                    [theme.breakpoints.up('sm')]: {
                        height: '460px',
                    },
                }}
            >
                {selectedForm}
            </Box>
        </Box>
    );
});

export default CSDMainForm;