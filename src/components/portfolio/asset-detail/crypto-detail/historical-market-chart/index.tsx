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
} from '@mui/material';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { BiLineChart } from 'react-icons/bi';
import { FcCandleSticks } from 'react-icons/fc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CandleStickChart } from './candle-stick-chart';
import { AreaChart } from './area-chart';

interface IProps {
  data: Array<any>;
  handleTimeIntervalChanged: any;
}

export const HistoricalMarketChart = ({
  data,
  handleTimeIntervalChanged,
}: IProps) => {
  const [selection, setSelection] = useState('0');
  const [chartType, setChartType] = useState('candlestick');

  const timeRangeList = [
    { timeRange: '1 day', interval: '30 minutes', amount: 1 },
    { timeRange: '1 week', interval: '4 hours', amount: 7 },
    { timeRange: '2 weeks', interval: '4 hours', amount: 14 },
    { timeRange: '1 month', interval: '4 hours', amount: 30 },
    { timeRange: '6 months', interval: '4 days', amount: 180 },
    { timeRange: '1 year', interval: '4 days', amount: 365 },
  ];

  const handleSelectionChanged = (event: SelectChangeEvent) => {
    setSelection(event.target.value as string);
    const index = Number.parseInt(event.target.value);
    handleTimeIntervalChanged(timeRangeList[index].amount);
  };

  return (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
      <Card
        sx={{
          borderRadius: '12px',
          padding: '5px 20px 20px 20px',
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
          <CardContent>
            <Stack
              id="chart-display-selection"
              direction="row"
              spacing={1}
              display="flex"
              alignItems="center"
            >
              <FormControl sx={{ minWidth: 120 }}>
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
              <FormControl sx={{ minWidth: 120 }}>
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
                    width: '8rem',
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
            </Stack>
            <div id="chart">
              <Box display={chartType === 'area' ? 'none' : 'inherit'}>
                <CandleStickChart timeInterval = {timeRangeList[Number.parseInt(selection)]?.amount} data={data} />
              </Box>
              <Box display={chartType === 'candlestick' ? 'none' : 'inherit'}>
                <AreaChart data={data} />
              </Box>
            </div>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
};
