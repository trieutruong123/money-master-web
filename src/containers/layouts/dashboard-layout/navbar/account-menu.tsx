import {
  Avatar,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AccountMenuDropdown from './account-menu-dropdown';
import { UserCircle as UserCircleIcon } from 'assets/icons/user-circle';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { userStore } from 'shared/store';

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const handleCloseAccountMenuDropdown = () => {
    setAnchorEl(null);
  };

  const handleClickAccountAvatar = (event: React.MouseEvent<HTMLElement>) => {
    if (isSm) {
      router.push('/profile');
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <>
      <Tooltip title="Account">
        <IconButton
          onClick={handleClickAccountAvatar}
          aria-controls="account-menu"
          aria-haspopup="true"
          aria-expanded="true"
          sx={{
            height: 32,
            width: 32,
            ml:'1rem',
          }}
        >
          <Avatar
            sx={{
              backgroundColor: userStore.user?.backgroundColor,
              color: 'white',
              fontSize: '1.4rem',
              height: 32,
              width: 32,
            }}
          >
            {userStore.user?.email?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      {!isSm ? (
        <AccountMenuDropdown
          anchorEl={anchorEl}
          open={open}
          handleClose={handleCloseAccountMenuDropdown}
        />
      ) : null}
    </>
  );
};

export default AccountMenu;
