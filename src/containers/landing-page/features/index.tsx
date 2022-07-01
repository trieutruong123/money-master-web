import { Box, Grid, Typography } from "@mui/material";
import { colorScheme } from "utils/color-scheme";
import FeatureBox from "./feature-list";
import { Slide } from "react-awesome-reveal";
import styled from "./style/index.module.css";

interface IProps {
  content: any;
}

export default function LandingFeatures({ content }: IProps) {
  const featureList = content.feature;
  const features = [
    {
      id: 1,
      img: "/images/crypto-portfolio.png",
      title: featureList[0].title,
      desc: featureList[0].desc,
    },
    {
      id: 2,
      img: "/images/investing.png",
      title: featureList[1].title,
      desc: featureList[1].desc,
    },
    {
      id: 3,
      img: "/images/personal-finance.png",
      title: featureList[2].title,
      desc: featureList[2].desc,
    },
  ];

  return (
    <section id="service" className={`${styled.MiddleBlockSection} section`}>
      <Slide direction="up">
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          mx="1rem"
          mb='2rem'
          mt="2rem"
        >
          <Box alignItems="center" className = {styled.ContentWrapper}>
            <Typography
              variant="h3"
              mb="1rem"
              fontSize="40px"
              align="center"
              color={colorScheme.theme}
            >
              {content?.title}
            </Typography>
            <Typography
              variant="body1"
              fontSize="1.4rem"
              textAlign="center"
              className = {styled.Content}
            >
              {content?.desc}
            </Typography>
          </Box>
        </Grid>
      </Slide>

      <FeatureBox features={features} />
    </section>
  );
}
