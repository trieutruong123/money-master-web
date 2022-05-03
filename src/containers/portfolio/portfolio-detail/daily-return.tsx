// import { Box, Card, CardHeader, CardContent, Grid } from '@mui/material';
// import { Bar } from 'react-chartjs-2';
// import { PortfolioItem } from 'shared/models';

// interface IProps {
//   dailyReturnsData: Array<PortfolioItem>;
// }

// export const DailyReturns = ({ dailyReturnsData }: IProps) => {
//   const chartLabels = dailyReturnsData.map((data) => data.symbol);
//   const dataSet = dailyReturnsData.map((data) =>
//     parseFloat(data.percentChange),
//   );

//   const data: any = (canvas: any) => {
//     const ctx: any = canvas.getContext('2d');

//     const greenGradient = ctx.createLinearGradient(0, 0, 0, 400);
//     greenGradient.addColorStop(0, 'rgba(152, 222, 91, 1)');
//     greenGradient.addColorStop(1, 'rgba(8, 225, 174, 1)');

//     const redGradient = ctx.createLinearGradient(0, 0, 0, 400);
//     redGradient.addColorStop(0, 'rgba(130, 114, 114, 1)');
//     redGradient.addColorStop(1, 'rgba(216, 196, 173, 1)');

//     const colors = dataSet.map((value) =>
//       value < 0 ? redGradient : greenGradient,
//     );

//     return {
//       labels: chartLabels,
//       datasets: [
//         {
//           backgroundColor: colors,
//           data: dataSet,
//         },
//       ],
//     };
//   };

//   const options: any = {
//     indexAxis: 'y',
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           title: function (context: any) {
//             return '';
//           },
//           label: function (context: any) {
//             return ` ${context.label}: ${context.dataset.data[
//               context.dataIndex
//             ].toFixed(2)}%`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           callback: function (
//             value: number | string,
//             index: number,
//             values: any,
//           ) {
//             return value + '%';
//           },
//           font: {
//             family: 'Lato, sans-serif',
//             size: 13,
//           },
//           color: '#4c4c4c',
//         },
//         grid: {
//           color: '',
//         },
//       },
//       y: {
//         ticks: {
//           font: {
//             family: 'Lato, sans-serif',
//             size: 13,
//           },
//           color: '#4c4c4c',
//         },
//       },
//     },
//     maintainAspectRatio: false,
//     responsive: true,
//   };

//   return (
//     <Grid
//       item
//       lg={6}
//       md={6}
//       xl={6}
//       sm={8}
//       xs={12}

//     >
//       <Card
//         sx={{
//           borderRadius: '12px',
//           padding: '5px 20px 20px 20px',
//           boxShadow: '0 0 8px rgba(0,0,0,0.11)',
//         }}
//       >
//         <CardHeader
//           title="Daily Percentage Returns"
//           sx={{ height: '3rem', padding: '0px' }}
//         />
//         <CardContent>
//           <Box>
//             <Bar data={data} height={450} options={options} />
//           </Box>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// };

export const DailyReturns = () => {
  return <></>;
};
