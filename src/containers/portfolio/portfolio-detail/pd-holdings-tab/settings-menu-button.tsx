import ClickAwayListener from '@mui/material/ClickAwayListener';
import * as React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  ListItemText,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { AssetType } from 'shared/types';

interface IProps {
  assetType: AssetType;
  assetId: string;
  portfolioId: string;
  content: any;
  deleteAsset: (
    assetType: AssetType,
    assetId: string,
    portfolioId: string,
  ) => void;
  transferAssetToInvestFund: (
    assetType: AssetType,
    assetId: string,
    portfolioId: string,
  ) => void;
}

export default function SettingsMenuButton({
  assetType,
  assetId,
  portfolioId,
  content,
  deleteAsset,
  transferAssetToInvestFund,
}: IProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTransferAssetToInvestFund = () => {
    transferAssetToInvestFund(assetType, assetId, portfolioId);
    handleClose();
  };

  const handleDeleteAsset = () => {
    deleteAsset(assetType, assetId, portfolioId);
    handleClose();
  };

  return (
    <React.Fragment>
      <Tooltip title="Asset settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MoreVertIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="transaction-settings-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
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
        <MenuItem onClick={handleTransferAssetToInvestFund}>
          <ListItemIcon>
            <ShowChartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{content.moveToPortfolio}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteAsset}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{content.delete}</ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
