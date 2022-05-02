import { useEffect, useState } from "react";
import { fcsapiService } from "services/fcsapi-service";
import classes from "./currency-profile.module.css";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import Link from '@mui/material/Link';

import { width } from "@mui/system";
interface IProps {
  currencyCode: string;
}

function CurrencyProfile(props: IProps) {
  const [currencyInfo, setCurrencyInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { currencyCode } = props;
  useEffect(() => {
    setIsLoading(true);
    if (!currencyCode) return;
    fcsapiService.getForexProfileDetail(currencyCode).then((info) => {
      setCurrencyInfo(info.data.response[0]);
      setIsLoading(false);
    });
  }, [props]);

  if (isLoading) return <div>LOADING...</div>;
  if (!currencyInfo) return <div>ERROR IN LOADING DATA</div>;
  return currencyInfo ? (
    //####################################################################
    <div className={classes.tab_content}>
      <div className={classes.horizontal_display} style={{justifyContent:"center"}}>
        <h1>{currencyInfo.name}</h1>
        <div className={classes.currency_icon}>{currencyInfo.symbol}</div>
      </div>
      <div className={classes.horizontal_display}>
        <img src={currencyInfo.icon} className={classes.flag}></img>
        <h4>Country: {currencyInfo.country}</h4>
      </div>
      <div className={classes.horizontal_display}>
        <AccountBalanceIcon/>
        <h4>Bank: <Link href={`http://${currencyInfo.website}`}>{currencyInfo.bank}</Link></h4>
      </div>
      <div className={classes.horizontal_display}>
        <LocalAtmIcon/>
        <h4>Bank note: </h4>
          {(currencyInfo.banknotes.split(',')).map((note:any)=><div className={classes.banknote}>{note}</div>)}
      </div>
      <div className={classes.horizontal_display}>
        <MonetizationOnIcon/>
        <h4>Coins: </h4>
          {(currencyInfo.coins.split(',')).map((note:any)=><div className={classes.coin}>{note}</div>)}
      </div>
      <div className={classes.horizontal_display}>
      
      </div>
      <div className={classes.horizontal_display}>
        
      </div>
    </div>
    //####################################################################
  ) : (
    <div>LOADING...</div>
  );
}

export default CurrencyProfile;
