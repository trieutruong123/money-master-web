import classes from "./exchange-rate-info.module.css";

function ExchangeRateInfo(){
    return (
        <div className={classes.content}>
            <div className={classes.exchange_result}>
                <h1 >{"1.000"} {"GBP"} {"="} <span style={{color:'green'}}>{"1.234"}</span> {"USD"}</h1>
                <i>Mid-market exchange rate at {"14:12 UTC"}</i>
                                
            </div>
        </div>
  )
}

export default ExchangeRateInfo;