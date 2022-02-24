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
} from '@mui/material';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'components';

interface IProps {
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
  content,
  openDrawer,
  setOpenDrawer,
}: IProps) {
  const { locale } = useRouter();
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
          <ListItem sx={{ p: 0 }}>
            <ListItemButton>
              <ListItemText>
                <Link href="/" locale={locale}>
                  <Typography sx={{ fontSize: '1.2rem' }} align="center">
                    {content.home}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText>
                <Link href="/#service" locale={locale}>
                  <Typography sx={{ fontSize: '1.2rem' }} align="center">
                    {content.service}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText>
                <Link href="/#about" locale={locale}>
                  <Typography sx={{ fontSize: '1.2rem' }} align="center">
                    {content.about}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemButton>
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
