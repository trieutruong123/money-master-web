import { useState } from 'react';
import {
  Avatar,
  Box,
  Collapse,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  useTheme,
} from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars';
import { v4 as uuid } from 'uuid';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { BsCashCoin, BsMinecartLoaded } from 'react-icons/bs';
import { RiPsychotherapyFill } from 'react-icons/ri';
import { AiFillGolden } from 'react-icons/ai';
import { GiMiner } from 'react-icons/gi';
import { AssetTypeName } from 'shared/constants';

interface IProps {
  openNextForm: (params:any)=>void;
  content: any;
}

export const ChooseTypesForm = ({ openNextForm, content }: IProps) => {
  const [isOtherCollapse, setOtherCollapse] = useState(false);

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
    {
      id: uuid(),
      type: AssetTypeName.other,
      label: content.others,
      icon: <RiPsychotherapyFill />,
    },
  ];

  const comodityList = [
    {
      id: uuid(),
      type: 'gold',
      label: 'Gold',
      icon: <AiFillGolden />,
    },
    {
      id: uuid(),
      type: 'silver',
      label: 'Silver',
      icon: <AiFillGolden />,
    },
  ];
  const handleOpenComodityList = () => {
    setOtherCollapse(!isOtherCollapse);
  };

  const handleSelectionClick = (type: string) => {
    openNextForm({ curFormType: 'type', selectedType: type });
  };

  return (
    <div id="searching-form-modal" style={{ height: 'inherit' }}>
      <div id="header-searching-form">
        <h2
          id="modal-modal-title"
          style={{ textAlign: 'center', marginTop: '1rem', fontSize: '2rem' }}
        >
          {content.title}
        </h2>
      </div>
      <Scrollbars>
        <List
          sx={{
            width: 'auto',
          }}
        >
          <ListItemButton key="comodity-type" onClick={handleOpenComodityList}>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'appColor.blue' }}>
                <GiMiner />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Comodity" />
            {isOtherCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={isOtherCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {comodityList.map((item) => {
                return (
                  <ListItemButton key={item.id} sx={{ pl: 8 }}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'appColor.blue' }}>
                        {item.icon}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                    <ChevronRightIcon />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
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
        </List>
      </Scrollbars>
    </div>
  );
};
