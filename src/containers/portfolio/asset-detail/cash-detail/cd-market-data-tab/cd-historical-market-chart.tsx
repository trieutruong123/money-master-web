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
} from '@mui/material';
import { useState } from 'react';
import { BiLineChart } from 'react-icons/bi';
import { FcCandleSticks } from 'react-icons/fc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CandleStickChart } from './candle-stick-chart';
import { AreaChart } from './area-chart';
import { observer } from 'mobx-react-lite';
import { cashDetailStore } from 'shared/store';

interface IProps {
}

const CDHistoricalMarketChart = observer(({
}: IProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');
  const [selection, setSelection] = useState('0');
  const [chartType, setChartType] = useState('candlestick');

  const timeRangeList = Array(
    { timeRange: '1 day', interval: '30 minutes', dayAmount: 1, barAmount: 48 },
    { timeRange: '1 week', interval: '30 minutes', dayAmount: 7, barAmount: 42 },
    { timeRange: '2 weeks', interval: '4 hours', dayAmount: 14, barAmount: 84 },
    { timeRange: '1 month', interval: '4 hours', dayAmount: 30, barAmount: 180 },
    { timeRange: '6 months', interval: '1 day', dayAmount: 180, barAmount: 180 },
    { timeRange: '1 year', interval: '1 week', dayAmount: 365, barAmount: 52 },
  ).reverse();


  const handleSelectionChanged = (event: SelectChangeEvent) => {
    setSelection(event.target.value as string);
    const index = Number.parseInt(event.target.value);
    cashDetailStore.setTimeInterval(timeRangeList[index].dayAmount);
  };

  return (cashDetailStore.OHLC_data !== undefined && cashDetailStore.forexMarketData !== undefined ? (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
      <Card
        sx={{
          borderRadius: '12px',
          padding: isMobile ? '5px' : '5px 20px 20px 20px',

          boxShadow: '0 0 8px rgba(0,0,0,0.11)',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: 'none',
          }}
        >
          <CardContent sx={{ padding: isMobile ? '32px 0px' : 'initial', width: '100%' }}>
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
                <InputLabel id="time-range-select-label">Range</InputLabel>
                <Select
                  labelId="time-range-select-label"
                  id="time-range-select"
                  value={selection}
                  label="Range"
                  onChange={handleSelectionChanged}
                >
                  {timeRangeList.map((item, index) => (
                    <MenuItem key={index.toString()} value={index}>
                      {item.timeRange}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 80, px: '.2rem', pb: '.2rem' }}>
                <InputLabel id="interval-select-label">Interval</InputLabel>
                <Select
                  labelId="interval-select-label"
                  id="interva-select"
                  value={selection}
                  label="Interval"
                  onChange={handleSelectionChanged}
                >
                  {timeRangeList.map((item, index) => (
                    <MenuItem key={index.toString()} value={index}>
                      {item.interval}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <BsThreeDotsVertical size={20} />
              <Stack direction="row">
                <Button
                  sx={{
                    width: '7rem',
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
                    width: '8rem',
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
                <CandleStickChart
                  timeInterval={
                    timeRangeList[Number.parseInt(selection)]
                  }
                  data={cashDetailStore.OHLC_data}
                />
              </Box>
              <Box display={chartType === 'candlestick' ? 'none' : 'inherit'}>
                <AreaChart
                  timeInterval={
                    timeRangeList[Number.parseInt(selection)]?.dayAmount
                  }
                  data={cashDetailStore.OHLC_data}
                />
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  ) : <></>);
});

export default CDHistoricalMarketChart;