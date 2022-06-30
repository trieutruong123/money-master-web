import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SupportedLanguage } from 'shared/types';
import { colorScheme } from 'utils';
import { v4 as uuid } from 'uuid';
import { SvgIcon } from './svg-icon';

interface IProps {
  content: any;
}

export default function LandingFooter({ content }: IProps) {
  const router = useRouter();
  const { locale, locales, asPath, pathname, query } = router;
  const handleClick = (lang: string) => {};
  const handleLanguageChange = (lanaguage: SupportedLanguage) => {
    router.push({ pathname, query }, asPath, { locale: lanaguage });
  };
  return (
    <section className="section" id="footer" style={{ paddingBottom: '0' }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        bgcolor={colorScheme.gray200}
      >
        <Grid
          container
          item
          md={10}
          xs={11}
          mt="2rem"
          mb="4rem"
          justifyContent="start"
        >
          <Grid item key={uuid()} xs={6} sm={4} md={4}>
            <Typography variant="h4" color={colorScheme.theme}>
              {content.content.title}
            </Typography>
            <Link href="/">
              <Typography
                fontSize="1.5rem"
                mt="0.5rem"
                color={colorScheme.black200}
                sx={{
                  '&:hover': {
                    color: colorScheme.blue300,
                  },
                }}
              >
                {content.content.intro}
              </Typography>
            </Link>
            <Link href="/#service">
              <Typography
                fontSize="1.5rem"
                mt="0.5rem"
                color={colorScheme.black200}
                sx={{
                  '&:hover': {
                    color: colorScheme.blue300,
                  },
                }}
              >
                {content.content.service}
              </Typography>
            </Link>
            <Link href="/#contact">
              <Typography
                fontSize="1.5rem"
                mt="0.5rem"
                color={colorScheme.black200}
                sx={{
                  '&:hover': {
                    color: colorScheme.blue300,
                  },
                }}
              >
                {content.content.contactUs}
              </Typography>
            </Link>
          </Grid>
          <Grid item key={uuid()} xs={6} sm={4} md={4}>
            <Typography variant="h4" color={colorScheme.theme}>
              {content.contact.title}
            </Typography>
            <Typography
              fontSize="1.25rem"
              width="60%"
              mt="0.5rem"
              color={colorScheme.black200}
            >
              {content.contact.tellUsEverything}
            </Typography>
            <Typography
              fontSize="1.25rem"
              width="60%"
              mt="0.5rem"
              color={colorScheme.blue200}
            >
              {content.contact.question}
            </Typography>
            <a href="mailto:moneymaster.co@gmail.com">
              <Typography
                fontSize="1.5rem"
                mt="0.5rem"
                color={colorScheme.blue200}
                sx={{
                  textDecoration: 'underline',
                  '&:hover': {
                    color: colorScheme.blue300,
                  },
                }}
              >
                {content.contact.letsChat}
              </Typography>
            </a>
          </Grid>
          <Grid item key={uuid()} xs={6} sm={4} md={4}>
            <Typography variant="h4" color={colorScheme.theme}>
              {content.language.title}
            </Typography>
            <Tooltip title={content.language.english}>
              <IconButton onClick={() => handleLanguageChange('en')}>
                <SvgIcon src={'languages/en.svg'} width="40px" height="27px" />
              </IconButton>
            </Tooltip>

            <Tooltip title={content.language.vietnamese}>
              <IconButton onClick={() => handleLanguageChange('vi')}>
                <SvgIcon src={'languages/vi.svg'} width="40px" height="40px" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container item md={10} xs={11} mb="2rem" justifyContent="start">
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant="h4" color={colorScheme.theme}>
              {content.ourAddress.title}
            </Typography>
            <br />
            <Typography fontSize="1.25rem" color={colorScheme.black200}>
              {content.ourAddress.street}
            </Typography>
            <Typography fontSize="1.25rem" color={colorScheme.black200}>
              {content.ourAddress.wardDistrict}
            </Typography>
            <Typography fontSize="1.25rem" color={colorScheme.black200}>
              {content.ourAddress.city}
            </Typography>
          </Grid>
          <Grid
            item
            key={uuid()}
            xs={6}
            sm={6}
            md={8}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          ></Grid>
        </Grid>
      </Grid>
    </section>
  );
}
