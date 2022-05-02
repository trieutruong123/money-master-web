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

export const HorizontalBarChart = ({ pieChartData, content }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fileredData = pieChartData.sort((a, b) => {
    return a.sumValue - b.sumValue;
  });
  const series = [{ data: fileredData.map((item) => item.sumValue) }];

  const colors = chroma
    .scale(['#313bf0', '#96ffea', '#008080'])
    .mode('lrgb')
    .colors(fileredData.length);

  const labels = fileredData.map((item) => item.assetType);

  const options = {
    chart: {
      type: 'bar',
      height: 300,
      width: '100%',
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    colors: colors,
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff'],
      },
      formatter: function (val: string, opt: any) {
        return opt.w.globals.labels[opt.dataPointIndex];
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#000'],
    },
    xaxis: {
      categories: labels,
      formatter: function (val: string, opt: any) {
        return opt.w.globals.labels[opt.dataPointIndex] + ': ' + val;
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: 'Bar Chart',
      align: 'center',
      floating: true,
    },

    tooltip: {
      theme: 'dark',
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
    },
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

      <CardContent sx={{ padding: 0, width: '100%', height: 'auto'}}>
        <AnyComponent type="bar" series={series} options={options} />
      </CardContent>
    </Card>
  );
};
