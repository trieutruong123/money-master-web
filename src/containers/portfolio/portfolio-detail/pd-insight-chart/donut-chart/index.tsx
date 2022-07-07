import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import chroma from 'chroma-js';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import { PieChartItem } from 'shared/models';

interface IProps {
  pieChartData: Array<PieChartItem>;
  content: any;
}

export const DonutChart = ({ pieChartData, content }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const totalValue = pieChartData.reduce(
    (total, cur, idx) => cur.sumValue + total,
    0,
  );
  const series = pieChartData.map(
    (item) => Math.round((item.sumValue * 10000) / totalValue) / 100,
  );

  const colors = chroma
    .scale(['#1b5e20', '#6200ea', '#ff5722'])
    .mode('lrgb')
    .colors(series.length);

  const labels = pieChartData.map((item) => item.assetType);

  const options = {
    labels: labels,
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          size: '50%',
          customScale: 0.8,
        },
        expandOnClick: true,
      },
    },
    chart: {
      width: 400,
      type: 'donut',
      height: 500,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    colors: colors,
    legend: {
      formatter: function (val: string, opts: any) {
        return `${val} - ${opts.w.globals.series[opts.seriesIndex]||0}%`;
      },
      title: {
        display: true,
        padding: 10,
        text: '',
      },
      position: 'bottom',
      horizontalAlign: 'center',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const AnyComponent = ReactApexChart as any;

  return (
    <Card
      sx={{
        borderRadius: '12px',
        padding: '5px 0px 0px 10px',
        boxShadow: '0 0 8px rgba(0,0,0,0.11)',
        height: '100%',
        width: '100%',
      }}
    >
      <CardHeader
        title={content.title}
        sx={{ height: '3rem', padding: '0px' }}
      />

      <CardContent sx={{ padding: 0, width: '100%', height: 'auto' }}>
        <AnyComponent type="donut" series={series} options={options} />
      </CardContent>
    </Card>
  );
};
