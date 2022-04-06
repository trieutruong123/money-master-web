import { useState } from 'react';
import {
  Avatar,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Typography,
  useTheme,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
}

export const ChooseTypesForm = ({ openNextForm }: IProps) => {
  const theme = useTheme();
  const [isOtherCollapse, setOtherCollapse] = useState(false);

  const handleOpenOthersList = () => {
    setOtherCollapse(!isOtherCollapse);
  };

  const handleSelectionClick = (type: string) => {
    openNextForm({ curFormType: 'type', selectedType: type });
  };

  return (
    <Box height="inherit" id="searching-form-modal">
      <Box id="header-searching-form">
        <Typography
          id="modal-modal-title"
          variant="h4"
          align="center"
          mt="1rem"
        >
          Choose Type
        </Typography>
      </Box>
      <PerfectScrollbar>
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
            <ListItemText primary="Others+" />
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
      </PerfectScrollbar>
    </Box>
  );
};

const CategoryList = [
  {
    id: uuid(),
    type: 'cryptoCurrency',
    label: 'Crypto Currency',
    icon: <CurrencyBitcoinIcon />,
  },
  { id: uuid(), type: 'stocks', label: 'Stocks', icon: <ShowChartIcon /> },
  {
    id: uuid(),
    type: 'realEstate',
    label: 'Real Estate',
    icon: <MapsHomeWorkIcon />,
  },
  { id: uuid(), type: 'cash', label: 'Cash', icon: <BsCashCoin /> },
  {
    id: uuid(),
    type: 'bankSavings',
    label: 'Bank Savings',
    icon: <AccountBalanceIcon />,
  },
];
