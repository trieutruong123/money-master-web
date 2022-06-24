import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Suspense, useCallback, useState } from 'react';
import { BiLineChart } from 'react-icons/bi';
import { FcCandleSticks } from 'react-icons/fc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CandleStickChart } from './candle-stick-chart';
import { AreaChart } from './area-chart';
import { cryptoDetailStore } from 'shared/store';
import { observer } from 'mobx-react-lite';

interface IProps {
  content: any
}

export const CDMarketChart = observer(({ content }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [rangeSelection, setTimeRangeSelection] = useState('0');
  const [intervalSelection, setInterval] = useState('0');
  const [chartType, setChartType] = useState('candlestick');

  const timeRangeList = [
    { timeRange: `1 ${content.marketDataTab.day}`, intervalId: 0, amount: 1 },
    { timeRange: `1 ${content.marketDataTab.week}`, intervalId: 1, amount: 7 },
    { timeRange: `2 ${content.marketDataTab.weeks}`, intervalId: 1, amount: 14 },
    { timeRange: `1 ${content.marketDataTab.month}`, intervalId: 1, amount: 30 },
    { timeRange: `6 ${content.marketDataTab.months}`, intervalId: 2, amount: 180 },
    { timeRange: `1 ${content.marketDataTab.year}`, intervalId: 2, amount: 365 },
  ];

  const timeIntervalList = [`30 ${content.marketDataTab.minutes}`, `4 ${content.marketDataTab.hours}`, `4 ${content.marketDataTab.days}`];

  const handeTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRangeSelection(event.target.value as string);
    const index = Number.parseInt(event.target.value);
    setInterval(timeRangeList[index].intervalId.toString());
    handleTimeIntervalChanged(timeRangeList[index].amount);
  };


  const handleTimeIntervalChange = (event: SelectChangeEvent) => {
    setInterval(event.target.value as string);
    const index = Number.parseInt(event.target.value);
    const timeRangeIndex = timeRangeList.findIndex(
      (item) => item.intervalId === index,
    );
    handleTimeIntervalChanged(timeRangeList[timeRangeIndex].amount);
  };

  const handleTimeIntervalChanged = useCallback((interval: number) => {
    cryptoDetailStore.setTimeInterval(interval.toString());
    cryptoDetailStore.fetchOHLC();
  }, []);

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
              spacing={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              paddingLeft={'10px'}
            >
              <FormControl sx={{ minWidth: 80, pb: '.2rem' }}>
                <InputLabel id="time-range-select-label">{content.marketDataTab.timeRange}</InputLabel>
                <Select
                  labelId="time-range-select-label"
                  id="time-range-select"
                  value={rangeSelection}
                  label={content.marketDataTab.timeRange}
                  onChange={handeTimeRangeChange}
                  sx={{ width: 110 }}
                >
                  {timeRangeList.map((item, index) => (
                    <MenuItem key={index.toString()} value={index}>
                      {item.timeRange}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 80, px: '.2rem', pb: '.2rem' }}>
                <InputLabel id="interval-select-label">{content.marketDataTab.interval}</InputLabel>
                <Select
                  sx={{ width: 120 }}
                  labelId="interval-select-label"
                  id="interva-select"
                  value={intervalSelection}
                  label={content.marketDataTab.interval}
                  onChange={handleTimeIntervalChange}
                >
                  {timeIntervalList.map((item, index) => (
                    <MenuItem key={index.toString()} value={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  {content.marketDataTab.area}
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
                  {content.marketDataTab.candleStick}
                </Button>
              </Stack>
            </Grid>
            <Grid>
              {cryptoDetailStore.OHLC_data !== undefined ? (
                <Suspense fallback={<></>}>
                  <Box display={chartType === 'area' ? 'none' : 'inherit'}>
                    <CandleStickChart
                      timeInterval={
                        timeRangeList[Number.parseInt(rangeSelection)]?.amount
                      }
                      data={cryptoDetailStore.OHLC_data}
                    />
                  </Box>
                </Suspense>
              ) : null}
              {cryptoDetailStore.OHLC_data !== undefined ? (
                <Suspense fallback={<></>}>
                  <Box
                    display={chartType === 'candlestick' ? 'none' : 'inherit'}
                  >
                    <AreaChart
                      timeInterval={
                        timeRangeList[Number.parseInt(rangeSelection)]?.amount
                      }
                      data={cryptoDetailStore.OHLC_data}
                    />
                  </Box>
                </Suspense>
              ) : null}
            </Grid>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
});
