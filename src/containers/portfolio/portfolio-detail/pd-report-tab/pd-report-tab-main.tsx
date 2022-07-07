//report tab in portfolio detail page
import { observer } from 'mobx-react-lite';
import { Grid } from '@mui/material';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { lazy, Suspense, useEffect } from 'react';
import { useRouter } from 'next/router';
import { content as i18n } from 'i18n';

const PDDonutchart = lazy(() => import('./pd-donut-chart'));
const PDHorizontalBarChart = lazy(() => import('./pd-horizontal-bar-chart'));
const PDSankeyChart = lazy(() => import('./pd-sankey-chart'));

interface IProps {
}

const PDReportTab = observer(({ }: IProps) => {
  const router = useRouter();
  const { locale } = router;
  const content = locale === 'vi' ? i18n['vi'].portfolioDetailPage : i18n['en'].portfolioDetailPage;
  useEffect(() => {
    const fetchData = async () => {
      rootStore.startLoading();
      await portfolioDetailStore.fetchReportData();
      rootStore.stopLoading();
    };
    if (
      portfolioDetailStore.isMissingReportData ||
      portfolioDetailStore.needUpdatedReportData
    ) {
      fetchData();
      portfolioDetailStore.setUpdateReport(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioDetailStore.needUpdatedReportData]);
  return (
    <Grid
      container
      item
      spacing={2}
      sx={{
        width: 'inherit',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
      }}
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
          mt: '1rem',
        }}
      >
        {typeof portfolioDetailStore.pieChartData !== 'undefined' ?
          <Suspense fallback={<></>}>
            <PDHorizontalBarChart content={content} pieChartData={portfolioDetailStore.pieChartData} />
          </Suspense>
          : <></>
        }
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
          mt: '1rem',

        }}
      >
        {typeof portfolioDetailStore.pieChartData !== 'undefined' ?
          <Suspense fallback={<></>}>
            <PDDonutchart content={content} pieChartData={portfolioDetailStore.pieChartData} />
          </Suspense>
          : <></>
        }
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 'auto',
        }}
      >
        {/* {portfolioDetailStore.sankeyFlowData && portfolioDetailStore.sankeyFlowData.length > 0 ? */}
          {/* <Suspense fallback={<></>}> */}
            <PDSankeyChart content={content.sankeyChart} />
          {/* </Suspense> */}
          {/* : <></>
        } */}
      </Grid>
    </Grid >
  );
});

export default PDReportTab;
