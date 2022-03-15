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

interface IProps {
  cryptoDetail: Array<any>;
  cashDetail: Array<any>;
  stockDetail: Array<any>;
  realEstateDetail: Array<any>;
  bankingDetail: Array<any>;
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
        <CryptoInvestments cryptoDetail={cryptoDetail}></CryptoInvestments>
        <StockInvestments stockDetail={stockDetail}></StockInvestments>
        <BankingInvestments bankingDetail={bankingDetail}></BankingInvestments>

        <Grid container item spacing={2} sx = {{display:'flex', alignItems:'stretch'}}>
          <CashInvestments cashDetail={cashDetail}></CashInvestments>
          <RealEstateInvesments
            realEstateDetail={realEstateDetail}
          ></RealEstateInvesments>
        </Grid>
      </Grid>
    );
  },
);
