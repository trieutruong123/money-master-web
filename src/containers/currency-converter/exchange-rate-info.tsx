import classes from "./exchange-rate-info.module.css";
import  HistoricalMarketChart  from "containers/portfolio/asset-detail/cash-detail/historical-market-chart";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";

import { cashDetailStore } from "shared/store";

interface IProps {
  cashDetailStore: typeof cashDetailStore;
  sourceAmount: number;
  targetAmount: number;
}

const ExchangeRateInfo = observer((props: IProps) => {
  const { cashDetailStore, sourceAmount, targetAmount } = props;
  const { historicalMarketData, forexMarketData } = cashDetailStore;

  const handleTimeIntervalChanged = useCallback((interval: number) => {
    cashDetailStore.setTimeInterval(interval);
    cashDetailStore.fetchHistoricalMarketData();
  }, []);

  return (
    <div className={classes.content}>
      <div className={classes.exchange_result}>
        <h1>
          {sourceAmount} {cashDetailStore.currencyId} {"="}{" "}
          <span style={{ color: "green" }}>{targetAmount}</span>{" "}
          {cashDetailStore.baseCurrencyCode}
        </h1>
        {forexMarketData !== undefined ? (
          <i>Mid-market exchange rate at {forexMarketData.response?forexMarketData.response[0].tm:""}</i>
        ) : (
          <></>
        )}
        {historicalMarketData !== undefined ? (
          <HistoricalMarketChart
            data={historicalMarketData}
            handleTimeIntervalChanged={handleTimeIntervalChanged}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
});

export default ExchangeRateInfo;
