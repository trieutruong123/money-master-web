import Head from "next/head";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { content } from "i18n";
import {
  Box,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DashboardLayout } from "containers";
import {
  TotalAssets,
  TotalProfit,
  InvestmentChannel,
  PlanProgress,
  RecentlyAdded,
  YourWallet,
} from "containers/dashboard";
import { BreadcrumbsLink } from "shared/components";
import { dummyNews } from "shared/store/dummyNews";
import NewsCard from "containers/dashboard/news-card";
import TopStock from "containers/dashboard/top-stock";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Dashboard = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = props.context;
  const detail = locale === "vi" ? content["vi"] : content["en"];
  const { dashboardPage } = detail;
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>{dashboardPage.title} | Money Mater</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <BreadcrumbsLink
            urlArr={["/dashboard"]}
            displayNameArr={["Dashboard"]}
          />
          <Typography sx={{ mb: 3 }} variant="h4">
            {dashboardPage.title}
          </Typography>

          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <TopStock />
            </Grid>
            <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
              Market News
            </Typography>
            <Grid container spacing={3}>
              {dummyNews.map((news: any, index: number) => (
                <NewsCard key={news.id} news={news} index={index} />
              ))}
            </Grid>
          </Container>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page: ReactJSXElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Dashboard.requireAuth = true;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      context,
    },
  };
};
export default Dashboard;
