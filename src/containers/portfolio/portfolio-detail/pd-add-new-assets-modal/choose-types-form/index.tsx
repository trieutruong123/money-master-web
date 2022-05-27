import { ReactEventHandler, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Avatar,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  ListItem,
  IconButton,
  TextField,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars';
import { v4 as uuid } from 'uuid';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import SaveIcon from '@mui/icons-material/Save';
import { BsCashCoin } from 'react-icons/bs';
import { RiPsychotherapyFill } from 'react-icons/ri';
import { AiFillGolden } from 'react-icons/ai';
import { AssetTypeName } from 'shared/constants';
import { portfolioDetailStore } from 'shared/store';

interface IProps {
  openNextForm: (params: any) => void;
  content: any;
}

export const ChooseTypesForm = observer(({ openNextForm, content }: IProps) => {
  const [isAddingNewAssetType, setOpenNewAssetType] = useState<boolean>(false);
  const [newAssetType, setAssetType] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const CategoryList = [
    {
      id: uuid(),
      type: AssetTypeName.cryptoCurrency,
      label: content.cryptoCurrency,
      icon: <CurrencyBitcoinIcon />,
    },
    {
      id: uuid(),
      type: AssetTypeName.stock,
      label: content.stock,
      icon: <ShowChartIcon />,
    },
    {
      id: uuid(),
      type: AssetTypeName.realEstate,
      label: content.realEstate,
      icon: <MapsHomeWorkIcon />,
    },
    {
      id: uuid(),
      type: AssetTypeName.cash,
      label: content.cash,
      icon: <BsCashCoin />,
    },
    {
      id: uuid(),
      type: AssetTypeName.bankSaving,
      label: content.bankSavings,
      icon: <AccountBalanceIcon />,
    },
  ];

  const handleSelectionClick = (
    assetType: string,
    selectedCustomAssetId?: number,
  ) => {
    if (assetType === AssetTypeName.others)
      portfolioDetailStore.setSelectedCustomAssetId(selectedCustomAssetId || 0);
    openNextForm({ curFormType: 'type', selectedType: assetType });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setAssetType(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' &&
      typeof newAssetType !== 'undefined' &&
      newAssetType.length > 0
    ) {
      portfolioDetailStore.addNewCustomAsseType({ name: newAssetType });
      setAssetType('');
      setOpenNewAssetType(false);
    }
  };

  const handleCreateNewAssetType = () => {
    if (typeof newAssetType !== 'undefined' && newAssetType.length > 0) {
      portfolioDetailStore.addNewCustomAsseType({ name: newAssetType });
      setAssetType('');
      setOpenNewAssetType(false);
      setErrorMessage('');
    } else {
      setErrorMessage('Type name is required');
    }
  };

  return (
    <div id="choose-type-form-modal" style={{ height: 'inherit' }}>
      <div id="header-choose-type-form">
        <h2
          id="modal-modal-title"
          style={{ textAlign: 'center', marginTop: '1rem', fontSize: '2rem' }}
        >
          {content.title}
        </h2>
      </div>
      <List
        sx={{
          overflowY: 'auto',
          height: '90%',
        }}
      >
        {CategoryList.map((item, index) => {
          return (
            <ListItemButton
              key={item.id}
              onClick={() => handleSelectionClick(item.type)}
            >
              <ListItemIcon>
                <Avatar sx={{ bgcolor: 'appColor.blue' }}>{item.icon}</Avatar>
              </ListItemIcon>
              <ListItemText primary={item.label} />
              <ChevronRightIcon />
            </ListItemButton>
          );
        })}

        {portfolioDetailStore.customAssetList?.map((item, index) => {
          return (
            <ListItemButton
              key={item.id}
              onClick={() =>
                handleSelectionClick(AssetTypeName.others, item.id)
              }
            >
              <ListItemIcon>
                <Avatar sx={{ bgcolor: 'appColor.blue' }}>
                  <RiPsychotherapyFill />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={item.name} />
              <ChevronRightIcon />
            </ListItemButton>
          );
        })}
        {!isAddingNewAssetType && (
          <ListItem key={uuid()} disableGutters>
            <Button
              sx={{
                width: '100%',
                textAlign: 'center',
                fontSize: '1.4rem',
                color: 'appColor.blue',
              }}
              onClick={() => setOpenNewAssetType(true)}
              fullWidth
            >
              Add new asset type+
            </Button>
          </ListItem>
        )}
        {isAddingNewAssetType && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              px: 0,
            }}
          >
            <TextField
              id="outlined-input-custom-asset-type"
              type="text"
              label="Asset type"
              variant="outlined"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              sx={{ width: '90%', ml: '1.5rem' }}
              error={errorMessage?.length > 0}
              helperText={errorMessage}
              required
            ></TextField>
            <IconButton
              aria-label="comment"
              onClick={handleCreateNewAssetType}
              sx={{ mr: '1rem', color: 'appColor.blue' }}
            >
              <SaveIcon sx={{ fontSize: '2.1rem' }} />
            </IconButton>
          </Box>
        )}
      </List>
    </div>
  );
});
