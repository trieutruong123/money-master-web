// @mui
import PropTypes from 'prop-types';
import { alpha, styled, Theme } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
// utils
// components
import { replace } from 'lodash';
import numeral from 'numeral';
import Iconify from './iconify';


// ----------------------------------------------------------------------
function fShortenNumber(number:number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}




const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

interface IProps{
  title:string,
  total:number,
  icon:any,
  sx?:any,
  color:string,
  [x:string]: any;

}

export default function AppWidgetSummary({ title, total, icon, color , sx, ...other }:IProps) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme:Theme) => Object(theme.palette)[color].dark,
        bgcolor:'#f1f2ed',
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme:Theme) => Object(theme.palette)[color].dark,
          backgroundImage: (theme:Theme) =>
            `linear-gradient(135deg, ${alpha(Object(theme.palette)[color].dark, 0)} 0%, ${alpha(
              Object(theme.palette)[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Typography variant="h3">#{fShortenNumber(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
