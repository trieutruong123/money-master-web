import { ReactEventHandler, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
    Avatar,
    List,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    IconButton,
    Box,
} from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars';
import { v4 as uuid } from 'uuid';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TransactionFormType, UsingMoneyContants, UsingMoneySource } from 'shared/constants';
import { portfolioDetailStore } from 'shared/store';
import { AiFillFund } from 'react-icons/ai';
import { MdOutlineMoney } from 'react-icons/md';
import { BiLinkExternal } from 'react-icons/bi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IProps {
    openNextForm: Function;
    openPreviousForm: Function
    content: any;
}

export const UsingMoneySourceForm = observer(({ openNextForm, openPreviousForm, content }: IProps) => {
    const selectedAsset = portfolioDetailStore.selectedAsset;
    const cashDetail = portfolioDetailStore.cashDetail;
    const CategoryList = [
        {
            id: uuid(),
            type: UsingMoneySource.usingOutside,
            label: content.usingOutside,
            icon: <BiLinkExternal />,
        },
        {
            id: uuid(),
            type: UsingMoneySource.usingCash,
            label: content.usingCash,
            icon: <MdOutlineMoney />,
        },
        {
            id: uuid(),
            type: UsingMoneySource.usingFund,
            label: content.usingFund,
            icon: <AiFillFund />,
        },
    ];

    const handleSelectionClick = (
        sourceType: string,
    ) => {
        portfolioDetailStore.setAddedAssetInfo({ ...selectedAsset, formType: TransactionFormType.selectMoneySource, moneySource: sourceType });
        openNextForm()
    };

    const handleComeback = () => {
        portfolioDetailStore.setAddedAssetInfo({ ...selectedAsset, formType: TransactionFormType.selectMoneySource });
        openPreviousForm()
    }

    return (
        <div id="choose-type-form-modal" style={{ height: 'inherit' }}>
            <Box style={{ marginTop: '1rem' }}>
                <h2
                    id="modal-modal-title"
                    style={{
                        textAlign: 'center',
                        marginTop: '1rem',
                        fontSize: '2rem',
                    }}
                >
                    {content.title}
                </h2>
                <IconButton
                    sx={{ position: 'absolute', left: '2rem', top: '1rem' }}
                    onClick={handleComeback}
                >
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <List
                sx={{
                    overflowY: 'auto',
                    height: '90%',
                }}
            >
                {CategoryList.map((item, index) => {
                    if (item.type === UsingMoneySource.usingCash && (cashDetail === undefined || cashDetail.length === 0)) {
                        return;
                    }
                    return (
                        <ListItemButton
                            key={item.id}
                            onClick={() => handleSelectionClick(item.type)}
                        >
                            <ListItemIcon>
                                <Avatar sx={{ bgcolor: 'appColor.blue' }}>{item.icon}</Avatar>
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                            <ChevronRightIcon />
                        </ListItemButton>
                    );
                })}
            </List>
        </div>
    );
});
