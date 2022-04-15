import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { DashboardLayout } from "components";
import {Sankey} from "components/portfolio/portfolio-detail/sankey-chart";
import { useEffect } from "react";
import { portfolioDetailStore } from "shared/store";

const fetchData=async()=>{
  await portfolioDetailStore.fetchSankeyFlowData();
}

const testSankey = (props: any) => {
  useEffect(()=>{
    fetchData();
  },[])
  const sankeyFlowData=portfolioDetailStore.sankeyFlowData;
  return (
    <div style={{margin:'15px'}}>
      <h1>TEST SANKEY PAGE</h1>
      <Sankey sankeyFlowData={sankeyFlowData}/>
    </div>
  );
};

testSankey.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default testSankey;
