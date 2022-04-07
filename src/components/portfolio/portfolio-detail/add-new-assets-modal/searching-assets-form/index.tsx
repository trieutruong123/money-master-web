import { useState, useEffect, useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import PerfectScrollbar from 'react-perfect-scrollbar';
import _ from 'lodash';
import {
  Box,
  IconButton,
  InputBase,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Paper,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { portfolioDetailStore } from 'store';
import { sampleData } from '../searching-data';

type SearchingItemType = {
  id: string;
  symbol: string;
  label: string;
};

interface IProps {
  openNextForm: any;
  openPreviousForm: any;
}

export const SearchingAssetsForm = observer(
  ({ openNextForm, openPreviousForm }: IProps) => {
    const [searchingData, setSearchingData] = useState<
      Array<SearchingItemType>
    >([]);
    const [searchingText, setSearchingText] = useState<string>('');

    useEffect(() => {
      //ref.current = _.debounce(searchData, 300);
    }, []);

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
      openNextForm({
        curFormType: 'search',
        selectedType: 'cryptoCurrency',
        assetId: itemId,
      });
    };

    const handleComeback = () => {
      openPreviousForm({ curFormType: 'search' });
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
      <Box height="inherit" id="searching-form-modal">
        <Box id="header-searching-form">
          <Box sx={{ mt: '1rem' }}>
            <Typography id="modal-modal-title" variant="h4" align="center">
              Search Assets
            </Typography>

            <IconButton
              sx={{ position: 'absolute', left: '2rem', top: '1rem' }}
              onClick={handleComeback}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>

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
              autoComplete="off"
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
