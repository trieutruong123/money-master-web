import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import { PieChartItem, PortfolioAllocation } from 'shared/models';

// export const AssetAllocation = ({ assetAllocationData }: IProps) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const chartLabels = assetAllocationData.map((data) => data.symbol);
//   const dataSet = assetAllocationData.map(
//     (data) => parseFloat(data.portfolioAllocation) * 100,
//   );
//   const colors = chroma
//     .scale(['#313bf0', '#96ffea', '#008080'])
//     .mode('lrgb')
//     .colors(dataSet.length);

//   const data: any = (canvas: any) => {
//     return {
//       labels: chartLabels,
//       datasets: [
//         {
//           data: dataSet,
//           backgroundColor: colors,
//           hoverOffset: 4,
//         },
//       ],
//     };
//   };

//   const options: any = {
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (context: any) {
//             return ` ${context.label}: ${context.dataset.data[
//               context.dataIndex
//             ].toFixed(2)}%`;
//           },
//         },
//       },
//       legend: {
//         position: 'bottom',
//         labels: {
//           boxWidth: 8,
//           usePointStyle: true,
//           pointStyle: 'circle',
//           color: '#4c4c4c',
//           padding: 15,
//           font: {
//             family: 'Lato, sans-serif',
//             size: 13,
//           },
//         },
//         title: {
//           display: true,
//           padding: 10,
//           text: '',
//         },
//       },
//     },
//     cutout: '55%',
//     layout: { padding: 0 },
//     maintainAspectRatio: true,
//     responsive: true,
//   };

interface IProps {
  pieChartData: Array<PieChartItem>;
}

export const AssetAllocation = ({ pieChartData }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const series = pieChartData.map((item) => item.sumValue);
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
    legend: {
      formatter: function (val: string, opts: any) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
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
            width: 400,
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
    <Grid item lg={6} md={6} xl={6} sm={12} xs={12}>
      <Card
        sx={{
          borderRadius: '12px',
          padding: '5px 0px 0px 10px',
          boxShadow: '0 0 8px rgba(0,0,0,0.11)',
          height:'auto',
          width:'100%'
        }}
      >
        <CardHeader
          title="Asset Allocation"
          sx={{ height: '3rem', padding: '0px' }}
        />

        <CardContent sx={{ padding: 0, width: '100%', height: 'auto' }}>
          <AnyComponent
            type="donut"
            series={series}
            width="100%"
            height={140}
            options={options}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};
