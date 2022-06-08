import * as React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import {
  Box, Card, CardContent, Grid, useTheme,
} from "@mui/material";
import { content } from "i18n";
import { cashDetailStore } from "shared/store";
import AmountConvert from "./amount-convert";
import classes from "./index.module.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IProps {

}

const CurrencyConverter = observer(({ }: IProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');

  const router = useRouter();
  const { locale } = router;
  const detail = locale === "vi" ? content["vi"] : content["en"];
  //const pageContent = detail.CurrencyConverterPage;

  const [sourceAmount, setSourceAmount] = React.useState(1.0);
  const [targetAmount, setTargetAmount] = React.useState(1.0);

  const handleSourceCurrencyChange = async (symbol: string) => {
    cashDetailStore.setSourceCurrency(symbol);
    await cashDetailStore.fetchForexInfoByCode();
    await cashDetailStore.fetchOHLC_Data();
    handleSourceValueChange(sourceAmount);
  };

  const handleTargetCurrencyChange = async (symbol: string) => {
    cashDetailStore.setDestCurrency(symbol);
    await cashDetailStore.fetchForexInfoByCode();
    await cashDetailStore.fetchOHLC_Data();
    handleTargetValueChange(targetAmount);
  };

  const handleSourceValueChange = (value: number) => {
    setSourceAmount(value);
    setTargetAmount(
      parseFloat(
        (value * cashDetailStore.forexMarketData.response[0].c).toPrecision(4)
      )
    );
  };

  const handleTargetValueChange = (value: number) => {
    setTargetAmount(value);
    setSourceAmount(
      parseFloat(
        (value / cashDetailStore.forexMarketData.response[0].c).toPrecision(4)
      )
    );
  };

  return (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
      <Card
        sx={{
          borderRadius: '12px',
          padding: isMobile ? '5px' : '5px 20px 20px 20px',

          boxShadow: '0 0 8px rgba(0,0,0,0.11)',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: 'none',
          }}
        >
          <CardContent sx={{ padding: isMobile ? '32px 0px' : 'initial', width: '100%' }}>
            <AmountConvert
              sourceAmount={sourceAmount}
              targetAmount={targetAmount}
              onSourceValueChange={handleSourceValueChange}
              onTargetValueChange={handleTargetValueChange}
              onSourceCurrencyChange={handleSourceCurrencyChange}
              onTargetCurrencyChange={handleTargetCurrencyChange}
            />

          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
});

export default CurrencyConverter;
