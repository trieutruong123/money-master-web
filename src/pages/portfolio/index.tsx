import Head from "next/head";
import { Box, Container, Typography, Button } from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { DashboardLayout } from "components/dashboard-layout";
import PortfolioCard from "components/portfolio/portfolio-list/portfolio-card";
import * as React from "react";
import Modal from "@mui/material/Modal";
import NewPortfolio from "../../components/portfolio/portfolio-list/modify-portfolio";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { content } from "i18n";

var portfolioList = [
  {
    name: "Investment 1",
    balance: 200,
    currency: "VND",
    id: "1",
  },
  {
    name: "Investment 2",
    balance: 400,
    currency: "USD",
    id: "2",
  },
];

const Portfolio = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = props.context;
  const detail = locale === "vi" ? content["vi"] : content["en"];
  const pageContent = detail.portfolioListPage;

  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const createHandler = (data: any) => {
    // call create API
    console.log(data);     
    setOpenCreateModal(false);
  };

  const updateHandler = (data: any) => {
   // call update API
   console.log("UPDATED: ",data);
  };

  const deleteHandler=(portfolioId:string)=>{
    // call delete APi
    console.log("DELETED ID: ",portfolioId);
  }

  return (
    <>
      <Head>
        <title>Portfolio | Money Master</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography sx={{ mb: 3 }} variant="h4">
            {pageContent.title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Button variant="contained" onClick={handleOpenCreateModal}>
            {pageContent.add}
          </Button>
        </Container>
        <Container maxWidth={false}>
          <Modal
            open={openCreateModal}
            onClose={handleCloseCreateModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ mt: 10 }}
          >
            <NewPortfolio
              content={pageContent.newPortfolioModal}
              onModifyPortfolio={createHandler}
            />
          </Modal>
          {portfolioList.map((portfolio) => (
            <PortfolioCard
              content={pageContent}
              portfolio={portfolio}
              key={portfolio.id}
              onUpdate={updateHandler}
              onDelete={deleteHandler}
            />
          ))}
        </Container>
      </Box>
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
      context,
    },
  };
};

export default Portfolio;
