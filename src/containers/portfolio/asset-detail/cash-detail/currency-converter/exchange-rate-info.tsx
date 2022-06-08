import classes from "./exchange-rate-info.module.css";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";

import { cashDetailStore } from "shared/store";
import CDHistoricalMarketChart from "../cd-market-data-tab/cd-historical-market-chart";

interface IProps {
  cashDetailStore: typeof cashDetailStore;
  sourceAmount: number;
  targetAmount: number;
}

const ExchangeRateInfo = observer((props: IProps) => {
  const { cashDetailStore, sourceAmount, targetAmount } = props;
  const { OHLC_data, forexMarketData } = cashDetailStore;

  const handleTimeIntervalChanged = useCallback((interval: number) => {
    cashDetailStore.setTimeInterval(interval);
    cashDetailStore.fetchOHLC_Data();
  }, []);

  return (
    <div className={classes.content}>
      <div className={classes.exchange_result}>
        <h1>
          {sourceAmount} {cashDetailStore.sourceCurrencyCode} {"="}{" "}
          <span style={{ color: "green" }}>{targetAmount}</span>{" "}
          {cashDetailStore.destCurrencyCode}
        </h1>
        {forexMarketData !== undefined ? (
          <i>Mid-market exchange rate at {forexMarketData.response ? forexMarketData.response[0].tm : ""}</i>
        ) : (
          <></>
        )}
        {OHLC_data !== undefined ? (
          <CDHistoricalMarketChart />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
});

export default ExchangeRateInfo;
