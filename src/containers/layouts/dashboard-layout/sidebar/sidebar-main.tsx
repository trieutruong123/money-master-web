import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Drawer,
  useMediaQuery,
} from '@mui/material';
import { userService } from 'services';
import SidebarItemList from './sidebar-item-list';
import { rootStore } from 'shared/store';

interface IProps  {
  onClose: Function,
  open: boolean,
};


export const DashboardSidebar = (props: IProps) => {
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

  useEffect(() => {
    const lang = router.locale === 'vi' ? 'vi' : 'en';
    rootStore.setLocale(lang);
  }, [router.locale])

  const handleLogout = () => {
    userService.logout();
    router.push('/sign-in');
  };

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
        <SidebarItemList />
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
      <SidebarItemList />
    </Drawer>
  );
};

