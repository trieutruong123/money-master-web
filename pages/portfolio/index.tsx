import Head from "next/head";
import { Box, Container, Typography, Button } from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { DashboardLayout } from "components/dashboard-layout";
import {
  Cash,
  InterestBearingAssets,
  NoneInterestBearingAssets,
  RealEstate,
  PortfolioCard,
} from "components/portfolio";
import { Link } from "components";
import * as React from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

var portfolioList = [
  {
    name: "Investment 1",
    initBalance: 200,
    id: '1',
  },
  {
    name: "Investment 2",
    initBalance: 400,
    id: '2',
  },
  {
    name: "Investment 3",
    initBalance: 600,
    id: '3',
  },
];

const Portfolio = () => {
  const [values, setValues] = React.useState({
    portfolioName: "",
    initBalance: "",
  });
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const createHandler = () => {
    portfolioList.push({
      name: values.portfolioName,
      initBalance: parseInt(values.initBalance),
      id: Date.now().toString(16),
    });

    console.log(values);
    setOpenCreateModal(false);
  };
  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const portfolioName = React.useRef();

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
          >
            <Box sx={style}>
              <Typography sx={{ mb: 3 }} variant="h4">
                ADD NEW PORTFOLIO
              </Typography>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required
                    id="portfolioName"
                    name="portfolioName"
                    label="Portfolio Name"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="initBalance"
                    name="initBalance"
                    label="Initial Balance"
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    onChange={handleChange}
                  />
                </div>
                <Button variant="contained" onClick={createHandler}>
                  Create
                </Button>
              </Box>
            </Box>
          </Modal>
          {portfolioList.map((portfolio) => (
            <PortfolioCard
              name={portfolio.name}
              initBalance={portfolio.initBalance}
              id={portfolio.id}
            />
          ))}
          ;
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
