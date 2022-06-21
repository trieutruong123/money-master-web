import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Typography, CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
// utils
//
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  backgroundColor:getRandomBgColor(),
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));


function fDate(datetime:number):string{
  return dayjs(datetime).format('DD/MM/YYYY')
}

function getRandomInt(min:number, max:number):number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomBgColor():string {
  var randColorCode=getRandomInt(1,3);
  switch(randColorCode){
    case 1:return deepOrange[500];
    case 2:return deepPurple[500];
    default:return "#ffffff"
  }
}

function stringAvatar(name: string) {
  var shortName:string;
  shortName=name.split(' ').map(name=>name[0]).join('')
  console.log(shortName)
  return {
    sx: {
      bgcolor: deepOrange[500],
    },
    children: `${shortName}`,
  };
}

interface IProps  {
  news: any,
  index: number,
};

export default function NewsCard({ news, index }:IProps) {
  const { image, headline,source, datetime,url } = news;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;



  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >

          <AvatarStyle {...stringAvatar(source)} 
          sx={{
            ...((latestPostLarge || latestPost) && {
              zIndex: 9,
              top: 24,
              left: 24,
              width: 40,
              height: 40,
            }),
          }}/>
          
          {/* <AvatarStyle
            alt={source}
            src={source.avatarimage}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          /> */}


          <img 
            style = {{
                top: 0,
                width: '100%',
                height: '100%',
                objectFit: 'fill',
                position: 'absolute',
            }} 
            alt={headline} 
            src={image} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(datetime)}
          </Typography>

          <Link
            href={url}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
            }}
          >
            {headline}
          </Link>

          
        </CardContent>
      </Card>
    </Grid>
  );
}
