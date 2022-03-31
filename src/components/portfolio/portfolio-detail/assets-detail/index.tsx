import { Box, Grid, TableCell } from '@mui/material';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { styled } from '@mui/material/styles';
import { BankingInvestments } from './banking-detail';
import { CryptoInvestments } from './crypto-detail';
import { StockInvestments } from './stock-detail';
import { RealEstateInvesments } from './real-estate-detail';
import { CashInvestments } from './cash-detail';
import { RealEstateItem, BankSavingItem } from 'types';

interface IProps {
  cryptoDetail: Array<any> | undefined;
  cashDetail: Array<any> | undefined;
  stockDetail: Array<any> | undefined;
  realEstateDetail: Array<RealEstateItem> | undefined;
  bankingDetail: Array<BankSavingItem> | undefined;
}

export const AssetsDetail = observer(
  ({
    cryptoDetail,
    cashDetail,
    stockDetail,
    realEstateDetail,
    bankingDetail,
  }: IProps) => {
    const router = useRouter();
    const { locale } = useRouter();

    return (
      <Grid container item>
        {typeof cashDetail !== undefined && cashDetail?.length ? (
          <CryptoInvestments cryptoDetail={cryptoDetail}></CryptoInvestments>
        ) : (
          <></>
        )}
        {typeof cashDetail !== undefined && cashDetail?.length ? (
          <StockInvestments stockDetail={stockDetail}></StockInvestments>
        ) : (
          <></>
        )}
        {typeof bankingDetail !== undefined && bankingDetail?.length ? (
          <BankingInvestments
            bankingDetail={bankingDetail}
          ></BankingInvestments>
        ) : (
          <></>
        )}

        <Grid
          container
          item
          spacing={2}
          sx={{ display: 'flex', alignItems: 'stretch' }}
        >
          {typeof cashDetail !== undefined && cashDetail?.length ? (
            <CashInvestments cashDetail={cashDetail}></CashInvestments>
          ) : (
            <></>
          )}
          {typeof realEstateDetail !== undefined && realEstateDetail?.length ? (
            <RealEstateInvesments
              realEstateDetail={realEstateDetail}
            ></RealEstateInvesments>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    );
  },
);
