import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Divider,
  IconButton,
  Drawer,
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
import { Link } from 'shared/components';
import { MultipleLanguage } from 'shared/components';
import { colorScheme } from 'utils';

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
    router.push('/', '/', { locale: locale, shallow: true });
    document
      .getElementById('top-of-page')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const anchor = 'left';
  return (
    <Drawer
      anchor={anchor}
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      onClick={toggleDrawer(anchor, true)}
    >
      <Box
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        sx={{ width: 280 }}
      >
        <DrawerHeader>
          <Box
            width="100%"
            mt="6rem"
            mb='1rem'
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => setOpenDrawer(false)}
          >
            <Box marginRight = 'auto' width= '2rem'/>
            <h4
              style={{
                textAlign: 'left',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: colorScheme.theme,
              }}
            >
              MENU
            </h4>
            <IconButton sx ={{marginLeft:'auto'}} onClick={() => setOpenDrawer(false)}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        <List component="nav">
          <ListItemButton
            sx={{
              py: 0,
              px: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MultipleLanguage></MultipleLanguage>
          </ListItemButton>
          <ListItem sx={{ py: 0, px: 1 }}>
            <ListItemButton onClick={scrollToTopOfPage}>
              <ListItemText>
                <Typography
                  sx={{ fontSize: '1.2rem' }}
                  color={colorScheme.theme}
                  align="center"
                >
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
                  <Typography
                    sx={{ fontSize: '1.2rem' }}
                    color={colorScheme.theme}
                    align="center"
                  >
                    {content.service}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ py: 0, px: 1 }}>
            <ListItemButton
              onClick={() => {
                handleSelectionChange('feature');
              }}
            >
              <ListItemText>
                <Link href="/#feature" locale={locale}>
                  <Typography
                    sx={{ fontSize: '1.2rem' }}
                    color={colorScheme.theme}
                    align="center"
                  >
                    {content.feature}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ py: 0, px: 1 }}>
            <ListItemButton
              onClick={() => {
                handleSelectionChange('aboutUs');
              }}
            >
              <ListItemText>
                <Link href="/#about-us" locale={locale}>
                  <Typography
                    sx={{ fontSize: '1.2rem' }}
                    color={colorScheme.theme}
                    align="center"
                  >
                    {content.aboutUs}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
