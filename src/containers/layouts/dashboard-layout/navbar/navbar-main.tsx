import styled from '@emotion/styled';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from 'mobx-react-lite';
import { Bell as BellIcon } from 'assets/icons/bell';
import { Users as UsersIcon } from 'assets/icons/users';
import { MultipleLanguage } from 'shared/components';
import { rootStore } from 'shared/store';
import { useEffect } from 'react';
import AccountMenu from './account-menu';

const DashboardNavbarRoot = styled(AppBar)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = observer((props: any) => {
  const { onSidebarOpen, ...other } = props;
  const { isLoading, isNotified, variant, message } = rootStore;

  useEffect(() => {
    if (isNotified) {
    }
  }, [isNotified]);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <AccountMenu />
          <MultipleLanguage></MultipleLanguage>
        </Toolbar>
        {isLoading && (
          <LinearProgress
            sx={{ m: 0, p: 0, color: 'appColor.main', width: '100%' }}
          />
        )}
      </DashboardNavbarRoot>
    </>
  );
});
