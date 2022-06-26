import { useEffect, useState } from 'react';
import classes from './style/crypto-profile.module.css';
import ArticleIcon from '@mui/icons-material/Article';
import LanguageIcon from '@mui/icons-material/Language';
import NumbersIcon from '@mui/icons-material/Numbers';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Link from '@mui/material/Link';
import { observer } from 'mobx-react-lite';
import { cryptoDetailStore } from 'shared/store';
import {
  Grid, Card, CardContent, useTheme
} from "@mui/material";
interface IProps {
}

const CryptoProfile = observer(({ }: IProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');

  const [cryptoInfo, setCryptoInfo] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!cryptoDetailStore.cryptoProfile) {
      setIsLoading(true);
    }
    else {
      setCryptoInfo(cryptoDetailStore.cryptoProfile);
      setIsLoading(false);
    }
  }, [cryptoDetailStore.cryptoProfile]);

  if (isLoading) return <div>LOADING...</div>;

  if (!cryptoInfo) return <div>ERROR IN LOADING DATA</div>;

  return cryptoDetailStore.cryptoProfile ? (
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
            <div className={classes.tab_content}>
              <div
                className={classes.horizontal_display}
                style={{ justifyContent: 'center' }}
              >
                <h1>{cryptoInfo.name}</h1>
                <img src={cryptoInfo.icon} className={classes.crypto_icon}></img>

              </div>
              <div className={classes.horizontal_display}>
                <DriveFileRenameOutlineIcon />
                <h4>Short name: {cryptoInfo.short_name}</h4>
              </div>
              <div className={classes.horizontal_display}>
                <NumbersIcon />
                <h4>Crypto code: {cryptoInfo.symbol}</h4>
              </div>
              <div className={classes.horizontal_display}>
                <LanguageIcon />
                <h4>
                  Website:{' '}
                  <Link href={`${cryptoInfo.website}`}>
                    {cryptoInfo.website}
                  </Link>
                </h4>
              </div>
              <div className={classes.horizontal_display}>
                <ArticleIcon />
                <h4>Relative urls: </h4>
                {Object.keys(cryptoInfo.urls).map((key: any, index: number) => cryptoInfo.urls[key]!=null?(
                  <Link href={`${cryptoInfo.urls[key]}`} style={{textDecoration: 'none'}} >
                  <div key={index.toString()} className={classes.banknote}>
                    {key}
                  </div>
                  </Link>
                ):<div></div>)}
              </div>
              
              <div className={classes.horizontal_display}></div>
              <div className={classes.horizontal_display}></div>
            </div>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  ) : (
    <div>LOADING CRYPTO PROFILE...</div>
  );
});

export default CryptoProfile;
