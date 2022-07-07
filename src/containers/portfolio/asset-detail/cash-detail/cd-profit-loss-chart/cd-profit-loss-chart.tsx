import {
  CardHeader,
  Card,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  useMediaQuery,
  useTheme,
  Box,
  SelectChangeEvent,
  Stack,
  Button,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { BsFillBarChartFill } from 'react-icons/bs';
import { HypnosisLoading } from 'shared/components';
import { cashDetailStore } from 'shared/store';
import { v4 as uuid } from 'uuid';
import { content as i18n } from 'i18n';
import { useRouter } from 'next/router';

const LineChart = lazy(() => import('shared/components/line-chart/index'));
const ColumnChart = lazy(() => import('shared/components/column-chart/index'));

const CDProfitLossChart = observer(() => {
  const router = useRouter();
  const { locale, query } = router;
  const content =
    locale === 'vi' ? i18n['vi'].cashDetailPage : i18n['en'].cashDetailPage;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleSelectedTypeChange = async (event: SelectChangeEvent) => {
    cashDetailStore.setProfitLossSelection('period', event.target.value as any);
    await cashDetailStore.fetchCashProfitLoss();
  };

  return (
    <>
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
            title={content.profitLoss.title}
            sx={{ padding: '0px', marginRight: 'auto' }}
          />
          <FormControl
            sx={{ minWidth: '6rem', height: '4rem', px: '.2rem', mt: '10px' }}
          >
            <InputLabel id="type-select-label">{content.profitLoss.interval}</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={cashDetailStore.profitLossSelection.period}
              label={content.profitLoss.interval}
              onChange={handleSelectedTypeChange}
            >
              <MenuItem key={uuid()} value={'day'}>
                {content.profitLoss.day}
              </MenuItem>
              <MenuItem key={uuid()} value={'month'}>
                {content.profitLoss.month}
              </MenuItem>
              <MenuItem key={uuid()} value={'year'}>
                {content.profitLoss.year}
              </MenuItem>
            </Select>
          </FormControl>
          <Stack mt='8px' direction="row">
            <Button
              sx={{
                width: '7rem',
                height: '3.7rem',
                fontSize: '1.2rem',
                display:
                  cashDetailStore.profitLossSelection.type === 'line'
                    ? 'none'
                    : 'inherit',
              }}
              onClick={() =>
                cashDetailStore.setProfitLossSelection('type', 'line')
              }
              variant="outlined"
              startIcon={<BsFillBarChartFill />}
            >
              {content.profitLoss.bar}
            </Button>
            <Button
              sx={{
                width: '7rem',
                height: '3.7rem',
                fontSize: '1.2rem',
                display:
                  cashDetailStore.profitLossSelection.type === 'bar'
                    ? 'none'
                    : 'inherit',
              }}
              onClick={() =>
                cashDetailStore.setProfitLossSelection('type', 'bar')
              }
              variant="outlined"
              startIcon={<AiOutlineLineChart />}
            >
              {content.profitLoss.line}
            </Button>
          </Stack>
          <Box ml="auto" />
        </Card>

        <Suspense fallback={<></>}>
          {cashDetailStore.profitLossList.length > 0 ? (
            <>
              <Box
                display={
                  cashDetailStore.profitLossSelection.type === 'bar'
                    ? 'none'
                    : 'inherit'
                }
              >
                <LineChart
                  data={cashDetailStore.profitLossList}
                  currencyCode={
                    cashDetailStore.portfolioInfo?.initialCurrency || 'USD'
                  }
                  xAxisLabel={content.profitLoss.date}
                  yAxisLabel={content.profitLoss.total}
                  title={content.profitLoss.total}
                />
              </Box>
              <Box
                display={
                  cashDetailStore.profitLossSelection.type === 'line'
                    ? 'none'
                    : 'inherit'
                }
              >
                <ColumnChart
                  data={cashDetailStore.profitLossList}
                  currencyCode={
                    cashDetailStore.portfolioInfo?.initialCurrency || 'USD'
                  }
                  xAxisLabel={content.profitLoss.date}
                  yAxisLabel={content.profitLoss.total}
                  title={content.profitLoss.total}
                />
              </Box>
            </>
          ) : (
            <HypnosisLoading />
          )}
        </Suspense>
      </Card>
    </>
  );
});

export default CDProfitLossChart;
