import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DashboardLayout } from 'components/layouts';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { PortfolioList } from 'components/portfolio';
import { portfolioStore } from '../../shared/store';
import { useEffect } from 'react';

const fetchData=async()=>{
  await portfolioStore.fetchPortfolioData();
}

export const  Portfolio =  (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {  
  useEffect(()=>{
    fetchData();
  },[])
  return(
    <>
      <Head>
        <title>Portfolio | Money Master</title>
      </Head>
      <PortfolioList context={props.context}/>
    </>
  );
};

//Portfolio.requireAuth = true;
Portfolio.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  
  return {
    props: {
      context
    },
  };
};



export default Portfolio;
