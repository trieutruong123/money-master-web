import { useEffect, useState } from 'react';
import classes from './style/currency-profile.module.css';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Link from '@mui/material/Link';
import { observer } from 'mobx-react-lite';
import { cashDetailStore } from 'shared/store';
import {
  Grid, Card, CardContent, useTheme
} from "@mui/material";
interface IProps {
}

const CurrencyProfile = observer(({ }: IProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');

  const [currencyInfo, setCurrencyInfo] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!cashDetailStore.forexDetail || !cashDetailStore.forexDetail.response) {
      setIsLoading(true);
    }
    else {
      setCurrencyInfo(cashDetailStore.forexDetail.response[0]);
      setIsLoading(false);
    }
  }, [cashDetailStore.forexDetail]);

  if (isLoading) return <div>LOADING...</div>;

  if (!currencyInfo) return <div>ERROR IN LOADING DATA</div>;

  return cashDetailStore.forexDetail && cashDetailStore.forexDetail.response ? (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
      <Card
        sx={{
          borderRadius: '12px',
          padding: isMobile ? '5px' : '20px',

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
            <div className={classes.tab_content}>
              <div
                className={classes.horizontal_display}
                style={{ justifyContent: 'center' }}
              >
                <h1>{currencyInfo.name}</h1>
                <div className={classes.currency_icon}>{currencyInfo.symbol}</div>
              </div>
              <div className={classes.horizontal_display}>
                <img src={currencyInfo.icon} className={classes.flag}></img>
                <h4>Country: {currencyInfo.country}</h4>
              </div>
              <div className={classes.horizontal_display}>
                <AccountBalanceIcon />
                <h4>
                  Bank:{' '}
                  <Link href={`http://${currencyInfo.website}`}>
                    {currencyInfo.bank}
                  </Link>
                </h4>
              </div>
              <div className={classes.horizontal_display}>
                <LocalAtmIcon />
                <h4>Bank note: </h4>
                {currencyInfo.banknotes.split(',').map((note: any, index: number) => (
                  <div key={index.toString()} className={classes.banknote}>
                    {note}
                  </div>
                ))}
              </div>
              <div className={classes.horizontal_display}>
                <MonetizationOnIcon />
                <h4>Coins: </h4>
                {currencyInfo.coins.split(',').map((note: any, index: number) => (
                  <div key={index.toString()} className={classes.coin}>
                    {note}
                  </div>
                ))}
              </div>
              <div className={classes.horizontal_display}></div>
              <div className={classes.horizontal_display}></div>
            </div>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  ) : (
    <div>LOADING...</div>
  );
});

export default CurrencyProfile;
