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
import { lazy, Suspense, useCallback, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { BiLineChart } from 'react-icons/bi';
import { FcCandleSticks } from 'react-icons/fc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { stockDetailStore } from 'shared/store';
import { observer } from 'mobx-react-lite';

const AreaChart = lazy(() => import('./area-chart'));
const CandleStickChart = lazy(() => import('./candle-stick-chart'));

interface IProps {}

const calcTimeInterval = (startDate: Date | null, endDate: Date | null) => {
  const interval = ['1', '5', '15', '30', '60', 'D', 'W', 'M'];
  const numOfDays = dayjs(endDate).diff(startDate, 'day', true);
  if (numOfDays <= 2) return interval[2];
  else if (numOfDays <= 7) return interval[3];
  else if (numOfDays <= 30) return interval[4];
  else if (numOfDays <= 365) return interval[5];
  else return interval[6];
};

export const SDMarketChart = observer(({}: IProps) => {
  const [chartType, setChartType] = useState('candlestick');
  const [startDate, setStartDate] = useState(
    dayjs(Date.now()).subtract(2, 'year').toDate(),
  );
  const [endDate, setEndDate] = useState(dayjs(Date.now()).toDate());
  const timeInterval = calcTimeInterval(startDate, endDate);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDateSelectionChanged = useCallback((params: any) => {
    stockDetailStore.setTimeInterval(params?.interval);
    stockDetailStore.fetchOHLC({
      startDate: params?.startDate,
      endDate: params?.endDate,
      interval: params?.interval,
    });
  }, []);

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
    <>
      {stockDetailStore.OHLC_data.length>=0 ? (
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
                      onAccept={handleStartDateChange}
                      onChange={() => true}
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
                {stockDetailStore.OHLC_data !== undefined ? (
                  <Suspense fallback={<></>}>
                    <Box display={chartType === 'area' ? 'none' : 'inherit'}>
                      <CandleStickChart
                        timeInterval={timeInterval}
                        data={stockDetailStore.OHLC_data}
                      />
                    </Box>
                  </Suspense>
                ) : null}
                {stockDetailStore.OHLC_data !== undefined ? (
                  <Suspense fallback={<></>}>
                    <Box
                      display={chartType === 'candlestick' ? 'none' : 'inherit'}
                    >
                      <AreaChart
                        timeInterval={timeInterval}
                        data={stockDetailStore.OHLC_data}
                      />
                    </Box>
                  </Suspense>
                ) : null}
              </Grid>
            </CardContent>
          </Card>
        </Card>
      ) : null}
    </>
  );
});
