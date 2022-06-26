import {
  CardHeader,
  Card,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  useMediaQuery,
  Stack,
  Button,
  useTheme,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense } from 'react';
import { HypnosisLoading } from 'shared/components';
import { realEstateDetailStore } from 'shared/store';
import { v4 as uuid } from 'uuid';
import { BsFillBarChartFill } from 'react-icons/bs';
import { AiOutlineLineChart } from 'react-icons/ai';

const LineChart = lazy(() => import('shared/components/line-chart/index'));
const ColumnChart = lazy(() => import('shared/components/column-chart/index'));

const REProfitLossChart = observer(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleSelectedTypeChange = async (event: SelectChangeEvent) => {
    realEstateDetailStore.setProfitLossSelection(
      'period',
      event.target.value as any,
    );
    realEstateDetailStore.fetchRealEstateProfitLoss();
  };

  return (
    <>
      <Suspense fallback={<HypnosisLoading />}>
        <Card
          sx={{
            borderRadius: '12px',
            padding: isMobile ? '5px 0px 0px 10px' : '5px 20px 20px 20px',
            boxShadow: '0 0 8px rgba(0,0,0,0.11)',
          }}
        >
          <Card
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '5rem',
              boxShadow: 'none',
            }}
          >
            <CardHeader
              title="Profit/Loss"
              sx={{ padding: '0px', marginRight: 'auto' }}
            />
            <FormControl
              sx={{ minWidth: '6rem', height: '4rem', px: '.2rem', mt: '10px' }}
            >
              <InputLabel id="type-select-label">Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                value={realEstateDetailStore.profitLossSelection.period}
                label={'Type'}
                onChange={handleSelectedTypeChange}
              >
                <MenuItem key={uuid()} value={'day'}>
                  Day
                </MenuItem>
                <MenuItem key={uuid()} value={'month'}>
                  Month
                </MenuItem>
                <MenuItem key={uuid()} value={'year'}>
                  Year
                </MenuItem>
              </Select>
            </FormControl>
            <Stack mt="8px" direction="row">
              <Button
                sx={{
                  width: '7rem',
                  height: '3.7rem',
                  fontSize: '1.2rem',
                  display:
                    realEstateDetailStore.profitLossSelection.type === 'line'
                      ? 'none'
                      : 'inherit',
                }}
                onClick={() =>
                  realEstateDetailStore.setProfitLossSelection('type', 'line')
                }
                variant="outlined"
                startIcon={<BsFillBarChartFill />}
              >
                {'Line'}
              </Button>
              <Button
                sx={{
                  width: '7rem',
                  height: '3.7rem',
                  fontSize: '1.2rem',
                  display:
                    realEstateDetailStore.profitLossSelection.type === 'bar'
                      ? 'none'
                      : 'inherit',
                }}
                onClick={() =>
                  realEstateDetailStore.setProfitLossSelection('type', 'bar')
                }
                variant="outlined"
                startIcon={<AiOutlineLineChart />}
              >
                {'Bar'}
              </Button>
            </Stack>
            <Box ml="auto" />
          </Card>
          <Suspense fallback={<></>}>
            {realEstateDetailStore.profitLossList.length > 0 ? (
              <>
                <Box
                  display={
                    realEstateDetailStore.profitLossSelection.type === 'bar'
                      ? 'none'
                      : 'inherit'
                  }
                >
                  <LineChart
                    data={realEstateDetailStore.profitLossList}
                    currencyCode={
                      realEstateDetailStore.portfolioInfo?.initialCurrency ||
                      'USD'
                    }
                    xAxisLabel="Date"
                    yAxisLabel="Total"
                    title="Total"
                  />
                </Box>
                <Box
                  display={
                    realEstateDetailStore.profitLossSelection.type === 'line'
                      ? 'none'
                      : 'inherit'
                  }
                >
                  <ColumnChart
                    data={realEstateDetailStore.profitLossList}
                    currencyCode={
                      realEstateDetailStore.portfolioInfo?.initialCurrency ||
                      'USD'
                    }
                    xAxisLabel="Date"
                    yAxisLabel="Total"
                    title="Total"
                  />
                </Box>
              </>
            ) : (
              <HypnosisLoading />
            )}
          </Suspense>
        </Card>
      </Suspense>
    </>
  );
});

export default REProfitLossChart;
