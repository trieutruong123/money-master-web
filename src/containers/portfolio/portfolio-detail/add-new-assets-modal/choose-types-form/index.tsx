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
import { BsCashCoin } from 'react-icons/bs';
import { RiPsychotherapyFill } from 'react-icons/ri';
import { AiFillGolden } from 'react-icons/ai';

interface IProps {
  openNextForm: any;
  content: any;
}

export const ChooseTypesForm = ({ openNextForm, content }: IProps) => {
  const [isOtherCollapse, setOtherCollapse] = useState(false);

  const CategoryList = [
    {
      id: uuid(),
      type: 'cryptoCurrency',
      label: content.cryptoCurrency,
      icon: <CurrencyBitcoinIcon />,
    },
    {
      id: uuid(),
      type: 'stocks',
      label: content.stock,
      icon: <ShowChartIcon />,
    },
    {
      id: uuid(),
      type: 'realEstate',
      label: content.realEstate,
      icon: <MapsHomeWorkIcon />,
    },
    { id: uuid(), type: 'cash', label: 'Cash', icon: <BsCashCoin /> },
    {
      id: uuid(),
      type: 'bankSavings',
      label: content.bankSavings,
      icon: <AccountBalanceIcon />,
    },
  ];

  const handleOpenOthersList = () => {
    setOtherCollapse(!isOtherCollapse);
  };

  const handleSelectionClick = (type: string) => {
    console.log(type);
    openNextForm({ curFormType: 'type', selectedType: type });
  };

  return (
    <div id="searching-form-modal" style={{ height: 'inherit' }}>
      <div id="header-searching-form">
        <h2
          id="modal-modal-title"
          style={{ textAlign: 'center', marginTop: '1rem',fontSize: '2rem', }}
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

          <ListItemButton key="others-type" onClick={handleOpenOthersList}>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'appColor.blue' }}>
                <RiPsychotherapyFill />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={content.others} />
            {isOtherCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={isOtherCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 8 }}>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: 'appColor.blue' }}>
                    <AiFillGolden />
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary="Gold" />
                <ChevronRightIcon />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Scrollbars>
    </div>
  );
};
