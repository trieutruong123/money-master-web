import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './navbar';
import { DashboardSidebar } from './sidebar';
import { toast } from 'react-toastify';
import { rootStore } from 'shared/store';
import { observer } from 'mobx-react-lite';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = observer((props: any) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { isNotified, message, variant } = rootStore;
  useEffect(() => {
    if (isNotified) {
      toast(message, {
        type: variant,
        onClose: () => rootStore.deleteNotification(),
      });
    }
  }, [isNotified, message, variant, rootStore, toast]);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
});
