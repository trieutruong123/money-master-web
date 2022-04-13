import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { BiLineChart } from 'react-icons/bi';
import { FcCandleSticks } from 'react-icons/fc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CandleStickChart } from './candle-stick-chart';
import { AreaChart } from './area-chart';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface IProps {
  data: Array<any>;
  handleDateSelectionChanged: any;
}

const calcTimeInterval = (startDate: Date | null, endDate: Date | null) => {
  const interval = ['1', '5', '15', '30', '60', 'D', 'W', 'M'];
  const numOfDays = dayjs(endDate).diff(startDate, 'day', true);
  if (numOfDays <= 2) return interval[2];
  else if (numOfDays <= 7) return interval[3];
  else if (numOfDays <= 30) return interval[4];
  else if (numOfDays <= 365) return interval[5];
  else return interval[6];
};

export const HistoricalMarketChart = ({
  data,
  handleDateSelectionChanged,
}: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [chartType, setChartType] = useState('candlestick');
  const [startDate, setStartDate] = useState(
    dayjs(Date.now()).subtract(2, 'year').toDate(),
  );
  const [endDate, setEndDate] = useState(dayjs(Date.now()).toDate());

  const timeInterval = calcTimeInterval(startDate, endDate);

  const handleStartDateChange = (newValue: Date | null) => {
    if (dayjs(newValue).isAfter(endDate) || dayjs(newValue).isAfter(Date.now()))
      return;
    if (newValue !== null && newValue !== undefined) {
      setStartDate(newValue);
      handleDateSelectionChanged({
        startDate: dayjs(startDate).unix(),
        endDate: dayjs(endDate).unix(),
        interval: calcTimeInterval(startDate, endDate),
      });
    }
  };

  const handleEndDateChange = (newValue: Date | null) => {
    if (dayjs(newValue).isBefore(startDate)) return;
    if (newValue !== null && newValue !== undefined) {
      setEndDate(newValue);
      handleDateSelectionChanged({
        startDate: dayjs(startDate).unix(),
        endDate: dayjs(endDate).unix(),
        interval: calcTimeInterval(startDate, endDate),
      });
    }
  };

  return (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
      <Card
        sx={{
          borderRadius: '12px',
          padding: isMobile ? '10px 5px 10px 5px' : '10px 20px 20px 20px',
          boxShadow: '0 0 8px rgba(0,0,0,0.11)',
          width: '100%',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: 'none',
            width: '100%',
          }}
        >
          <CardContent
            sx={{
              padding: isMobile ? '32px 0px 20px 0px' : '32px 0px',
              width: '100%',
            }}
          >
            <Grid
              id="chart-display-selection"
              container
              direction="row"
              spacing={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              paddingLeft={'20px'}
            >
              <Box
                sx={{
                  mb: '.4rem',
                  mr: '.5rem',
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    onAccept = {handleStartDateChange}
                    onChange={()=>true}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ width: '10rem' }} />
                    )}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  mb: '.4rem',
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date"
                    inputFormat="dd/MM/yyyy"
                    value={endDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ width: '10rem' }} />
                    )}
                  />
                </LocalizationProvider>
              </Box>

              <BsThreeDotsVertical size={20} />
              <Stack direction="row">
                <Button
                  sx={{
                    width: 112,
                    height: '3.8rem',
                    fontSize: '1.2rem',
                    display: chartType === 'candlestick' ? 'none' : 'inherit',
                  }}
                  onClick={() => setChartType('candlestick')}
                  variant="outlined"
                  startIcon={<BiLineChart />}
                >
                  Area
                </Button>
                <Button
                  sx={{
                    width: 112,
                    height: '3.8rem',
                    fontSize: '1.2rem',
                    display: chartType === 'area' ? 'none' : 'inherit',
                  }}
                  onClick={() => setChartType('area')}
                  variant="outlined"
                  startIcon={<FcCandleSticks />}
                >
                  Candle
                </Button>
              </Stack>
            </Grid>
            <Grid>
              <Box display={chartType === 'area' ? 'none' : 'inherit'}>
                <CandleStickChart timeInterval={timeInterval} data={data} />
              </Box>
              <Box display={chartType === 'candlestick' ? 'none' : 'inherit'}>
                <AreaChart timeInterval={timeInterval} data={data} />
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
};
