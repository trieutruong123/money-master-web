import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DashboardLayout } from 'components';
import { Sankey } from 'components/portfolio/portfolio-detail/insight-chart/sankey-chart';
import { GetStaticProps, InferGetStaticPropsType } from 'next/types';
import { useEffect } from 'react';
import { portfolioDetailStore } from 'shared/store';

const TestSankey = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  useEffect(() => {
    const fetchData = async () => {
      await portfolioDetailStore.fetchSankeyFlowData();
    };
    fetchData();
  }, []);

  const { locale, locales, defaultLocale } = props.context;

  const sankeyFlowData = portfolioDetailStore.sankeyFlowData;
  return (
    <div style={{ margin: '15px' }}>
      <h1>TEST SANKEY PAGE</h1>
      <Sankey sankeyFlowData={sankeyFlowData} />
    </div>
  );
};

TestSankey.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};

export default TestSankey;
