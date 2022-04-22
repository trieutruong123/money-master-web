import { useState } from 'react';
import { Router, useRouter } from 'next/router';
import Image from 'next/image';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Tabs,
  useTheme,
  useMediaQuery,
  IconButton,
  Tab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'shared/components';
import { colorScheme } from 'utils/color-scheme';
import DrawerComponent from './drawer-component';
import styled from './style/header.module.css';
import { MultipleLanguage } from 'shared/components'

interface IProps {
  content: any;
}

export default function DefaultNavbar({ content }: IProps) {
  const [value, setValue] = useState<any>('home');
  const [openDrawer, setOpenDrawer] = useState(false);
  const { locale, pathname, query, asPath } = useRouter();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const matchAuthPage: boolean = ['/sign-in', '/sign-up', '/'].includes(
    router.pathname,
  );

  const matchSpecificPage: boolean = ['/', 'docs'].includes(router.pathname);
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  const handleSelectedSectionChange = (newValue: string) => {
    setValue(newValue);
  };

  const scrollToTopOfPage = async () => {
    router.push('/', '/', { locale: locale, shallow: true });
    document
      .getElementById('top-of-page')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="section">
      <AppBar
        className={styled.navbar}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: colorScheme.white,
          color: colorScheme.black200,
        }}
      >
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                sx={{ mr: 1 }}
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <MenuIcon />
              </IconButton>
              <DrawerComponent
                handleSelectionChange={handleSelectedSectionChange}
                content={content}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
              />
            </>
          ) : null}
          <Box
            display="flex"
            mr="auto"
            justifyContent="start"
            alignItems="end"
            onClick={scrollToTopOfPage}
          >
            <Image
              id="app-icon"
              src="/images/app-icon.png"
              alt="app icon"
              width={'30'}
              height={'30'}
              priority
            />
            <Typography
              id="brand-name"
              sx={{
                ml: 1,
                color: colorScheme.theme,
              }}
              fontWeight="bold"
              style={{ cursor: 'pointer' }}
              variant="h6"
            >
              Money Master
            </Typography>
          </Box>
          {!isMobile && matchSpecificPage ? (
            <Box
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
              justifyContent="center"
              alignItems="center"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                centered
              >
                <Tab
                  value="home"
                  label={content.home}
                  onClick={scrollToTopOfPage}
                ></Tab>
                <Tab
                  value="service"
                  label={content.service}
                  onClick={() => {
                    router.push('/#service', '/#service', {
                      locale: locale,
                    });
                  }}
                ></Tab>
                <Tab
                  value="about"
                  label={content.about}
                  onClick={() => {
                    router.push('/#about', '/#about', {
                      locale: locale,
                    });
                  }}
                ></Tab>
                <Tab
                  value="docs"
                  label={content.docs}
                  onClick={() => {
                    router.push('/docs', '/docs', {
                      locale: locale,
                    });
                  }}
                ></Tab>
              </Tabs>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }} />
          )}

          {matchAuthPage && (
            <>
              <Button
                id="login-button"
                variant="contained"
                sx={{ bg: colorScheme.theme, mr: 1, ml: 'auto' }}
              >
                {router.pathname === '/sign-in' ? (
                  <Link href="/sign-up" locale={locale}>
                    {content.register}
                  </Link>
                ) : (
                  <Link href="/sign-in" locale={locale}>
                    {content.signIn}
                  </Link>
                )}
              </Button>
            </>
          )}
          {!isMobile && <MultipleLanguage></MultipleLanguage>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
