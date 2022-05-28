import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { userInfo } from 'os';
import { Link } from 'shared/components';
import { authStore, userStore } from 'shared/store';
import { colorScheme } from 'utils';

interface IProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const AccountMenuDropdown = observer(
  ({ open, anchorEl, handleClose }: IProps) => {
    const router = useRouter();

    const handleLogout = () => {
      authStore.logout();
      router.push('/sign-in');
    };

    return (
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href="/profile">
          <MenuItem>
            <Avatar
              sx={{
                backgroundColor: userStore.user?userStore.user?.backgroundColor:undefined||colorScheme.gray200,
                color: 'white',
                fontSize: '1.4rem',
              }}
            >
              {userStore.user?userStore.user?.email?.charAt(0).toUpperCase():undefined}
            </Avatar>
            {userStore.user?(userStore.user?.email.slice(0, 14)):'' + '...'}
          </MenuItem>
        </Link>
        <Divider />
        <Link href="/settings">
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    );
  },
);

export default AccountMenuDropdown;
