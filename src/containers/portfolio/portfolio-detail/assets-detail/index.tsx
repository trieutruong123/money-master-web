import { Box, Grid, TableCell, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import { BankingInvestments } from './banking-detail';
import { CryptoInvestments } from './crypto-detail';
import { StockInvestments } from './stock-detail';
import { RealEstateInvesments } from './real-estate-detail';
import { CashInvestments } from './cash-detail';
import { RealEstateItem, BankSavingItem } from 'shared/models';

interface IProps {
  cryptoDetail: Array<any> | undefined;
  cashDetail: Array<any> | undefined;
  stockDetail: Array<any> | undefined;
  realEstateDetail: Array<RealEstateItem> | undefined;
  bankingDetail: Array<BankSavingItem> | undefined;
  content: any;
}

export const AssetsDetail = observer(
  ({
    cryptoDetail,
    cashDetail,
    stockDetail,
    realEstateDetail,
    bankingDetail,
    content,
  }: IProps) => {
    const router = useRouter();
    const { locale } = useRouter();

    return (
      <Grid container item display="flex" justifyContent="center" mt="1rem">
        {typeof cashDetail !== undefined && cashDetail?.length ? (
          <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
            <CryptoInvestments
              content={content.cryptoTable}
              cryptoDetail={cryptoDetail}
            ></CryptoInvestments>
          </Grid>
        ) : (
          <></>
        )}
        {typeof stockDetail !== undefined && stockDetail?.length ? (
          <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
            <StockInvestments
              content={content.stockTable}
              stockDetail={stockDetail}
            ></StockInvestments>
          </Grid>
        ) : (
          <></>
        )}
        {typeof bankingDetail !== undefined && bankingDetail?.length ? (
          <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
            <BankingInvestments
              content={content.bankSavingsTable}
              bankingDetail={bankingDetail}
            ></BankingInvestments>
          </Grid>
        ) : (
          <></>
        )}

        <Grid
          container
          item
          spacing={2}
          sx={{ display: 'flex', alignItems: 'stretch' }}
        >
          {typeof cashDetail !== undefined &&
          cashDetail?.length &&
          typeof realEstateDetail !== undefined &&
          realEstateDetail?.length ? (
            <>
              <Grid item xl={4} lg={4} md={4} sm={4} xs={12} mt="1rem">
                <CashInvestments content = {content.cashTable} cashDetail={cashDetail}></CashInvestments>
              </Grid>
              <Grid item xl={8} lg={8} md={8} sm={8} xs={12} mt="1rem">
                <RealEstateInvesments
                  content = {content.realEstateTable}
                  realEstateDetail={realEstateDetail}
                ></RealEstateInvesments>
              </Grid>
            </>
          ) : typeof cashDetail !== undefined && cashDetail?.length ? (
            <Grid item xs={12} mt="1rem">
              <CashInvestments 
              content = {content.cashTable}
              cashDetail={cashDetail}></CashInvestments>
            </Grid>
          ) : (
            <Grid item xs={12} mt="1rem">
              <RealEstateInvesments
              content = {content.realEstateTable}
                realEstateDetail={realEstateDetail}
              ></RealEstateInvesments>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  },
);
