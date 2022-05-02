//report tab in portfolio detail page

import { observer } from 'mobx-react-lite';
import { Grid } from '@mui/material';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { DonutChart, HorizontalBarChart } from '../pd-insight-chart';
import { useEffect } from 'react';

interface IProps {
  content: any;
}

const PDReportTab = observer(({ content }: IProps) => {
  useEffect(() => {
    const fetchData = async () => {
      rootStore.startLoading();
      await portfolioDetailStore.fetchPieChartData();
      await portfolioDetailStore.fetchSankeyFlowData();
      rootStore.stopLoading();
    };
    if (portfolioDetailStore.isMissingReportData ) fetchData();
  }, []);

  const { pieChartData } = portfolioDetailStore;

  return typeof pieChartData !== 'undefined' ? (
    <Grid
      container
      item
      spacing={2} 
      sx={{width:'inherit', display: 'flex', alignItems: 'stretch',justifyContent:"center" }}
    >
      <Grid
        item
        lg={6}
        md={6}
        xl={6}
        sm={6}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DonutChart
          content={content.assetAllocation}
          pieChartData={pieChartData}
        />
      </Grid>
      <Grid
        item
        lg={6}
        md={6}
        xl={6}
        sm={6}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HorizontalBarChart
          content={content.assetAllocation}
          pieChartData={pieChartData}
        ></HorizontalBarChart>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
});

export default PDReportTab;
