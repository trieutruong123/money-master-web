import classes from "./exchange-rate-info.module.css";
import { cashDetailStore } from 'shared/store';
import { HistoricalMarketChart } from 'containers/portfolio/asset-detail/cash-detail/historical-market-chart';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from "react";


interface IProps {
    sourceAssetCode:string;
    targetAssetCode: string;
  }

const ExchangeRateInfo=observer((props:IProps) => {
    const {sourceAssetCode,targetAssetCode}=props;
    useEffect(() => {
        cashDetailStore.setBaseCurrency(sourceAssetCode);
        cashDetailStore.setCurrencyId(targetAssetCode);
        cashDetailStore.fetchData();
        cashDetailStore.fetchHistoricalMarketData();
      }, []);
      const {
        
        historicalMarketData,
        forexDetail,
        forexMarketData,
      } = cashDetailStore;

      const handleTimeIntervalChanged = useCallback((interval: number) => {
        cashDetailStore.setTimeInterval(interval);
        cashDetailStore.fetchHistoricalMarketData();
      }, []);
      
    return (
        <div className={classes.content}>
            <div className={classes.exchange_result}>
                <h1 >{"1.000"} {"GBP"} {"="} <span style={{color:'green'}}>{"1.234"}</span> {"USD"}</h1>
                <i>Mid-market exchange rate at {"14:12 UTC"}</i>
                
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
  )
})

export default ExchangeRateInfo;