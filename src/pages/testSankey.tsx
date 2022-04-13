import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { DashboardLayout } from "components";
import {Sankey} from "components/portfolio/sankey";

const testSankey = (props: any) => {
  return (
    <div style={{margin:'15px'}}>
      <h1>TEST SANKEY PAGE</h1>
      <Sankey/>
    </div>
  );
};

testSankey.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default testSankey;
