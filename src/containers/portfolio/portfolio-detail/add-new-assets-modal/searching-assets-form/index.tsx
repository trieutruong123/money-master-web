import { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDebounce } from 'use-debounce';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { portfolioDetailStore } from 'shared/store';
import { sampleData } from '../searching-data';

type SearchingItemType = {
  id: string;
  name: string;
  symbol: string;
};

interface IProps {
  assetType:string;
  openNextForm: (params: any) => void;
  openPreviousForm: (params: any) => void;
  searchData: any;
}

export const SearchingAssetsForm = observer(
  ({assetType, openNextForm, openPreviousForm, searchData }: IProps) => {
    const [searchingData, setSearchingData] =
      useState<Array<SearchingItemType>>([]);
    const [searchingText, setSearchingText] = useState<string>('');
    const [isSearching, setIsSearching] = useState(false);
    const [debouncedSearchTerm] = useDebounce(searchingText, 1000, {
    });
    useEffect(
      () => {
        if (debouncedSearchTerm) {
          setIsSearching(true);
          searchData({searchingText:debouncedSearchTerm, searchingType:assetType}).then(
            (results: Array<SearchingItemType> | any) => {
              setIsSearching(false);
              setSearchingData(results);
            },
          );
        } else {
          setSearchingData([]);
          setIsSearching(false);
        }
      },
      [debouncedSearchTerm], // Only call effect if debounced search term changes
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchingText(e.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsSearching(true);
        searchData({searchingText:debouncedSearchTerm, searchingType:assetType}).then(
          (results: Array<SearchingItemType> | any) => {
            setIsSearching(false);
            setSearchingData(results);
          },
        );
      }
    };

    const handleItemClick = (itemId: string,selectedItem:any) => {
      openNextForm({
        curFormType: 'search',
        selectedType: assetType,
        assetId: itemId,
        selectedItem:selectedItem,
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
      return h1 - h2 - 30;
    };

    return (
      <Box id="searching-form-modal" style={{ height: 'inherit' }}>
        <Box id="header-searching-form">
          <Box style={{ marginTop: '1rem' }}>
            <Typography
              id="modal-modal-title"
              style={{ textAlign: 'center', marginTop: '1rem' }}
            >
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
        <Scrollbars
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
                  key={uuid()}
                  onClick={() => handleItemClick(item.id,item)}
                >
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.symbol} secondary={item.name} />
                </ListItemButton>
              );
            })}
          </List>
        </Scrollbars>
      </Box>
    );
  },
);
