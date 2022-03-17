import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Chip,
  IconButton,
  InputBase,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FaBitcoin, FaHome } from 'react-icons/fa';
import { AiFillDollarCircle, AiOutlineStock } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';
import { portfolioDetailStore } from 'store';
import { sampleData } from '../searching-data';

type SearchingItemType = {
  id: string;
  symbol: string;
  label: string;
};

interface IProps {
  openTransactionForm: any;
}

export const SearchingAssetsForm = observer(
  ({ openTransactionForm }: IProps) => {
    const theme = useTheme();
    const [categories, setCategories] = useState(CategoryList);
    const [selectedArray, setSelectedArray] = useState<Array<boolean>>(
      categories.map((item) => true),
    );
    const [searchingData, setSearchingData] = useState<
      Array<SearchingItemType>
    >([]);
    const [searchingText, setSearchingText] = useState<string>('');
    const ref = useRef<any>(null);

    useEffect(() => {
      //ref.current = _.debounce(searchData, 300);
    }, []);

    const handleSelectedCategoryClick = (id: string) => {
      const newArray: Array<boolean> = categories.map((item, key) =>
        item.id === id ? !selectedArray[key] : selectedArray[key],
      );
      setSelectedArray(newArray);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchingText(e.target.value);
      //ref.current();
      searchData();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        //ref.current();
        searchData();
      }
    };

    const searchData = () => {
      if (searchingText === '' || searchingText === null) {
        setSearchingData([]);
      } else {
        const text = searchingText.toLowerCase();
        const data = sampleData.filter((item: SearchingItemType) => {
          if (
            item.symbol.toLowerCase().includes(text) ||
            item.label.toLowerCase().includes(text)
          )
            return item;
          else if (
            item.label.toLowerCase().startsWith(text) ||
            item.label.toLowerCase().startsWith(text)
          )
            return item;
        });
        setSearchingData(data);
      }
    };

    const handleItemClick = (itemId: string) => {
      openTransactionForm(itemId);
    };

    const getListElementHeight = (): number => {
      var ref, ref1;

      const h1 =
        ((ref = document.getElementById('searching-form-modal')) === null ||
        ref === void 0
          ? void 0
          : ref.offsetHeight) || 0.5;
      const h2 =
        ((ref1 = document.getElementById('header-searching-form')) === null ||
        ref1 === void 0
          ? void 0
          : ref1.offsetHeight) || 0.5;
      return h1 - h2 - 25;
    };

    return (
      <Box height = 'inherit' id="searching-form-modal">
        <Box id="header-searching-form">
          <Typography
            id="modal-modal-title"
            variant="h4"
            align="center"
            mt="1rem"
          >
            Choose Assets
          </Typography>
          <Paper
            component="div"
            sx={{
              p: '2px 4px',
              mx: '1rem',
              mt: '1rem',
              display: 'flex',
              alignItems: 'center',
              width: 'auto',
              border: '0.1px solid ',
              borderColor: 'neutral.300',
            }}
          >
            <InputBase
              name="searchingText"
              value={searchingText}
              id="searching-frame"
              type="text"
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search your asset"
              inputProps={{ 'aria-label': 'search your assets' }}
            />
            <IconButton
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={() => searchData()}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              flexDirection: 'row',
              mx: '1rem',
              my: 0.5,
            }}
          >
            {categories.map((item: any, key: number) => {
              return (
                <Chip
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  id={item.id}
                  variant={selectedArray[key] ? 'filled' : 'outlined'}
                  onClick={() => handleSelectedCategoryClick(item.id)}
                  sx={{ fontSize: '1rem', m: '0.2rem' }}
                />
              );
            })}
          </Box>
        </Box>
        <PerfectScrollbar
          style={{
            height: getListElementHeight(),
          }}
        >
          <List
            sx={{
              width: 'auto',
            }}
          >
            {searchingData.map((item: SearchingItemType) => {
              return (
                <ListItemButton
                  sx={{ pl: '1.4rem' }}
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                >
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${item.symbol} - ${item.label}`} />
                </ListItemButton>
              );
            })}
          </List>
        </PerfectScrollbar>
      </Box>
    );
  },
);

const CategoryList = [
  { id: uuid(), label: 'Crypto', icon: <FaBitcoin /> },
  { id: uuid(), label: 'Stocks', icon: <AiOutlineStock /> },
  { id: uuid(), label: 'Real Estate', icon: <FaHome /> },
  { id: uuid(), label: 'Cash', icon: <AiFillDollarCircle /> },
  { id: uuid(), label: 'Others+', icon: <></> },
];
