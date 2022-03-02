import { Box, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import chroma from 'chroma-js';
import { theme } from 'theme/index';

type allocationDataType = {
  symbol: string;
  portfolioAllocation: string;
};

interface IProps {
  assetAllocationData: Array<allocationDataType>;
}

export const AssetAllocation = ({ assetAllocationData }: IProps) => {
  const chartLabels = assetAllocationData.map((data) => data.symbol);
  const dataSet = assetAllocationData.map(
    (data) => parseFloat(data.portfolioAllocation) * 100,
  );
  console.log(chartLabels);
  console.log(dataSet);
  const colors = chroma
    .scale(['#313bf0', '#96ffea', '#008080'])
    .mode('lrgb')
    .colors(dataSet.length);

  const data: any = (canvas: any) => {
    return {
      labels: chartLabels,
      datasets: [
        {
          data: dataSet,
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    };
  };

  const options: any = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return ` ${context.label}: ${context.dataset.data[
              context.dataIndex
            ].toFixed(2)}%`;
          },
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#4c4c4c',
          padding: 15,
          font: {
            family: 'Lato, sans-serif',
            size: 13,
          },
        },
        title: {
          display: true,
          padding: 10,
          text: '',
        },
      },
    },
    cutout: '55%',
    layout: { padding: 0 },
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <Grid item lg={6} md={6} xl={6} xs={12}>
      <Card
        sx={{
          borderRadius: '12px',
          padding: '5px 20px 20px 20px',
          boxShadow: '0 0 8px rgba(0,0,0,0.11)',
        }}
      >
        <CardHeader
          title="Asset Allocation"
          sx={{ height: '3rem', padding: '0px' }}
        />

        <CardContent>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
            }}
          >
            <Doughnut data={data} height= {140} options={options} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
