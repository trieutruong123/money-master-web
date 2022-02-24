import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Divider,
  IconButton,
  SwipeableDrawer,
  ListItemButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'components';
import { MultipleLanguage } from 'components/mutiple-languages';

interface IProps {
  handleSelectionChange?: any;
  openDrawer: boolean;
  setOpenDrawer: any;
  content: any;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function DrawerComponent({
  handleSelectionChange,
  content,
  openDrawer,
  setOpenDrawer,
}: IProps) {
  const { locale } = useRouter();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpenDrawer(open);
    };
  const scrollToTopOfPage = async () => {
    document
      .getElementById('top-of-page')
      ?.scrollIntoView({ behavior: 'smooth' });
    router.push('/', '/', { locale: locale, shallow: true });
  };

  const anchor = 'left';
  return (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <SwipeableDrawer
        anchor={anchor}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={toggleDrawer(anchor, true)}
        sx={{ width: 200 }}
      >
        <DrawerHeader sx={{ mt: '4rem' }}>
          <IconButton onClick={() => setOpenDrawer(false)}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List component="nav">
          <ListItem
            sx={{
              py: 0,
              px: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ListItemButton>
              <MultipleLanguage></MultipleLanguage>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ py: 0, px: 1 }}>
            <ListItemButton onClick={scrollToTopOfPage}>
              <ListItemText>
                <Typography sx={{ fontSize: '1.2rem' }} align="center">
                  {content.home}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ py: 0, px: 1 }}>
            <ListItemButton
              onClick={() => {
                handleSelectionChange('service');
              }}
            >
              <ListItemText>
                <Link href="/#service" locale={locale}>
                  <Typography sx={{ fontSize: '1.2rem' }} align="center">
                    {content.service}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ py: 0, px: 1 }}>
            <ListItemButton
              onClick={() => {
                handleSelectionChange('about');
              }}
            >
              <ListItemText>
                <Link href="/#about" locale={locale}>
                  <Typography sx={{ fontSize: '1.2rem' }} align="center">
                    {content.about}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ py: 0, px: 1 }}>
            <ListItemButton
              onClick={() => {
                handleSelectionChange('docs');
              }}
            >
              <ListItemText>
                <Link href="/docs" locale={locale}>
                  <Typography sx={{ fontSize: '1.2rem' }} align="center">
                    {content.docs}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </Box>
  );
}
