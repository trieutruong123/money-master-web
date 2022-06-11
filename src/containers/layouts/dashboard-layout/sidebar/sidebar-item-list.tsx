import { Box, Divider, Link, Typography, useMediaQuery } from '@mui/material';
import { SidebarItem } from './sidebar-item';
import { MdDashboard } from 'react-icons/md';
import { BsFillBagFill } from 'react-icons/bs';
import { User as UserIcon } from 'assets/icons/user';
import { Cog as CogIcon } from 'assets/icons/cog';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import { userService } from 'services';
import { useRouter } from 'next/router';
import { Logout } from '@mui/icons-material';
import Image from 'next/image';
import { Selector as SelectorIcon } from 'assets/icons/selector';

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
    href: '/profile',
    icon: <UserIcon fontSize="small" />,
    title: 'Profile',
  },
];

const SidebarItemList = () => {
  const smDown = useMediaQuery((theme: any) => theme.breakpoints.down('sm'), {
    defaultMatches: true,
    noSsr: false,
  });
  const router = useRouter();

  const handleLogout = () => {
    userService.logout();
    router.push('/sign-in');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>
          <Box
            sx={{ p: 3 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Link href="/dashboard">
              <Image
                id="app-icon"
                src="/images/app-icon.png"
                alt="app icon"
                width={'60rem'}
                height={'60rem'}
              />
            </Link>
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
            <SidebarItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
          {smDown ? (
            <div onClick={handleLogout}>
              <SidebarItem
                icon={<Logout fontSize="small" />}
                href="/sign-in"
                title="Logout"
              />
            </div>
          ) : null}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
      </Box>
    </>
  );
};

export default SidebarItemList;
