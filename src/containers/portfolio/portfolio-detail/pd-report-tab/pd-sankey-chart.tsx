import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  IconButton,
  Select,
  MenuItem,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { SankeyDataLink } from 'shared/types';
import { Sankey } from '../pd-insight-chart/sankey-chart';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { GrPowerReset } from 'react-icons/gr';
import { v4 as uuid } from 'uuid';
import { portfolioDetailStore } from 'shared/store';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';

interface IProps {
  content: any;
}

const PDSankeyChart = observer(({ content }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleStartDateChange = async (
    value: any,
    keyboardInputValue?: string | undefined,
  ) => {
    const startDate = dayjs(new Date(value || Date.now()))
      .startOf('day')
      .toDate();
    portfolioDetailStore.setSankeySelection('startDate', startDate);
    const data = await portfolioDetailStore.fetchSankeyFlowData();
  };

  const handleEndDateChange = async (
    value: any,
    keyboardInputValue?: string | undefined,
  ) => {
    const endDate = dayjs(new Date(value || Date.now()))
      .endOf('day')
      .toDate();
    portfolioDetailStore.setSankeySelection('endDate', endDate);

    const data = await portfolioDetailStore.fetchSankeyFlowData();
  };

  const resetSankeyChart = async () => {
    portfolioDetailStore.setSankeySelection('startDate', null);
    portfolioDetailStore.setSankeySelection('endDate', null);
    const data = await portfolioDetailStore.fetchSankeyFlowData();
  };

  return (
    <Box width="100%">
      <Card
        sx={{
          borderRadius: '12px',
          padding: isMobile ? '5px 0px 0px 10px' : '5px 20px 20px 20px',
          boxShadow: '0 0 8px rgba(0,0,0,0.11)',
          height: '100%',
          width: '100%',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '5rem',
            boxShadow: 'none',
          }}
        >
          <CardHeader
            title={`${content.title}`}
            sx={{ height: '3rem', padding: '0px' , marginRight:"auto"}}
          />
          <Box
            sx={{
              mt: '10px',
              height: '4rem',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={'Start date'}
                inputFormat="dd/MM/yyyy"
                value={portfolioDetailStore.sankeySelection.startDate}
                onAccept={() => true}
                onChange={handleStartDateChange}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: '10rem' }} />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              mt: '10px',
              height: '4rem',
              ml: '5px',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={'End date'}
                inputFormat="dd/MM/yyyy"
                value={portfolioDetailStore.sankeySelection.endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: '10rem' }} />
                )}
              />
            </LocalizationProvider>
          </Box>
          <IconButton
            onClick={resetSankeyChart}
            sx={{
              padding: '0px',
              color: '#CBCBCD',
              marginLeft: 'auto',
              width: '3rem',
              height: '3rem',
            }}
          >
            <GrPowerReset />
          </IconButton>
        </Card>

        <CardContent sx={{ padding: 0, width: '100%', height: 'auto' }}>
          {portfolioDetailStore.sankeyFlowData &&
          portfolioDetailStore.sankeyFlowData.length > 0 ? (
            <Sankey sankeyFlowData={portfolioDetailStore.sankeyFlowData} />
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </Box>
  );
});
export default PDSankeyChart;
