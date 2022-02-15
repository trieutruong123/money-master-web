import { Box } from "@mui/material";
import { BrandIntro, Footer, Header, Layout, Feature } from "components";
import type { NextPage } from "next";
//import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Box id="top-of-page">
      <Layout>
        <Header />
        <BrandIntro />
        <Feature />
        <Footer />
      </Layout>
    </Box>
  );
};

export default Home;
