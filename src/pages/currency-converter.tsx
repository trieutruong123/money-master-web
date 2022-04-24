import Head from 'next/head';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { DashboardLayout } from 'containers/layouts';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import {CurrencyConverter} from 'containers';
import { portfolioStore } from 'shared/store';
import { useEffect } from 'react';



export const  CurrencyConverterPage =  (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {  
 
  return(
    <>  
      <Head>
        <title>Converter | Money Master</title>
      </Head>
      <CurrencyConverter context={props.context}/>
    </>
  );
};


CurrencyConverterPage.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  
  return {
    props: {
      context
    },
  };
};


export default CurrencyConverterPage;
