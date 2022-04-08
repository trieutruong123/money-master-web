import { useEffect } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ChartBar as ChartBarIcon } from 'assets/icons/chart-bar';
import { Cog as CogIcon } from 'assets/icons/cog';
import { Selector as SelectorIcon } from 'assets/icons/selector';
import { User as UserIcon } from 'assets/icons/user';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import { RiTodoFill } from 'react-icons/ri';
import { MdDashboard } from 'react-icons/md';
import { BsFillBagFill } from 'react-icons/bs';
import { NavItem } from './nav-item';

const items = [
  {
    href: '/dashboard',
    icon: <MdDashboard fontSize="small" />,
    title: 'Dashboard',
  },
  {
    href: '/portfolio',
    icon: <BsFillBagFill fontSize="small" />,
    title: 'Portfolio',
  },
  {
    href: '/report',
    icon: <PieChartOutlineIcon fontSize="small" />,
    title: 'Report',
  },
  {
    href: '/plan',
    icon: <RiTodoFill fontSize="small" />,
    title: 'Plan',
  },
  {
    href: '/profile',
    icon: <UserIcon fontSize="small" />,
    title: 'Profile',
  },
  {
    href: '/settings',
    icon: <CogIcon fontSize="small" />,
    title: 'Settings',
  },
];

export const DashboardSidebar = (props: any) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath],
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>
          <Box sx={{ p: 3 }} display ='flex' justifyContent="center" alignItems="center">
            <NextLink href="/dashboard" passHref>
              <a>
                <Image
                  id="app-icon"
                  src="/images/app-icon.png"
                  alt="app icon"
                  width={'60rem'}
                  height={'60rem'}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Money Master
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
