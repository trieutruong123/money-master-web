import Head from "next/head";
import { Box, Container, Typography, Button } from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { DashboardLayout } from "components/dashboard-layout";
import PortfolioCard from "components/portfolio/portfolio-list/portfolio-card";
import * as React from "react";
import Modal from "@mui/material/Modal";
import NewPortfolio from "../../components/portfolio/portfolio-list/new-portfolio";

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

const Portfolio = () => {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const createHandler = (data: any) => {
    console.log(data);
    portfolioList.push({
      name: data.portfolioName,
      balance: 0,
      currency: data.currency,
      id: Date.now().toString(16), // dummy ID
    });
    setOpenCreateModal(false);
  };

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
            Portfolio
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Button variant="contained" onClick={handleOpenCreateModal}>
            Create
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
            <NewPortfolio onCreatePortfolio={createHandler} />
          </Modal>
          {portfolioList.map((portfolio) => (
            <PortfolioCard portfolio={portfolio} key={portfolio.id} />
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

export default Portfolio;
