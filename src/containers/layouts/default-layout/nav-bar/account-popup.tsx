import { useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'shared/components';
import { userService } from 'services';

export default function AccountIconPopup() {
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const accountMenuId = 'account-menu-anchor-el';
  const isAccountMenuOpen = Boolean(accountMenuAnchorEl);

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null);
  };

  const handleProfileClick = () => {
    setAccountMenuAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setAccountMenuAnchorEl(null);
    userService.logout();
  };
  return (
    <>
      <Box sx={{ display: 'none' }}>
        <IconButton
          id="account-button"
          size="large"
          edge="start"
          aria-label="account of current user"
          aria-controls={accountMenuId}
          aria-haspopup="true"
          onClick={handleAccountMenuOpen}
          color="inherit"
        >
          <Avatar sx={{ width: 30, height: 30 }} />
        </IconButton>
        <Menu
          anchorEl={accountMenuAnchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          id={accountMenuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isAccountMenuOpen}
          onClose={handleAccountMenuClose}
          MenuListProps={{ 'aria-labelledby': 'account-button' }}
        >
          <MenuItem onClick={handleProfileClick}>
            <Link href="/profile">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar sx={{ width: 30, height: 30 }} />
                <span>dev@gmail.com</span>
              </Box>
            </Link>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogoutClick}>
            <ListItemIcon>
              <LogoutIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
