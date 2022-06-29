import Image from "next/image";
import { Box, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import { colorScheme } from "utils/color-scheme";
import { Fade } from "react-awesome-reveal";
import styled from './style/index.module.css';
import { colorScheme } from "utils/color-scheme";

interface FeatureItem {
  id: number;
  img: string;
  title: any;
  desc: any;
}

interface IProps {
  features: Array<FeatureItem>;
}
export default function FeatureBox({ features }: IProps) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box 
      className = {styled.FeatureListContainer}>
      {features.map((feature, key) => {
        return feature.id % 2 !== 0 && !isSm ? (
          <Fade key={key} direction="left">
            <Grid
              container
              spacing={8}
              className = {styled.FeatureContentContainer}
            >
                <Grid item xs ={12} sm = {8} md = {6} lg={5} >
                  <Image src={feature.img} alt="alt" width={450} height={450} />
                </Grid>
                <Grid item xs ={12} sm = {8} md = {6} lg={5} className = {styled.FeatureContentWrapper}>
                <Box alignItems="center" className = {styled.ContentWrapper}>
                    <Typography variant="h3" textAlign = 'left' fontSize="40px" mb='2rem' color = {colorScheme.theme}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize="1.4rem"
                      textAlign = 'left'
                    >
                      {feature.desc}
                    </Typography>
                    </Box>
                </Grid>
            </Grid>
            </Fade>

        ) : (
          <Fade key={key} direction="right" >
            <Grid
              container
              spacing={8}
              className = {styled.FeatureContentContainer}
            >
                <Grid 
                  item xs ={12} sm = {8} md = {6} lg={5}
                  className = {styled.FeatureContentWrapper}>
                    <Typography variant="h3" textAlign = 'left' fontSize="40px" mb='2rem' color = {colorScheme.theme}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      mb="1rem"
                      fontSize="1.4rem"
                      textAlign = 'left'
                    >
                      {feature.desc}
                    </Typography>
                </Grid>
                <Grid item xs ={12} sm = {8} md = {6} lg={5}>
                  <Image
                    src={feature.img}
                    alt="alt"
                    width={"450"}
                    height={"450"}
                  />
                </Grid>
              </Grid>
            </Fade>
        );
      })}
    </Box>
  );
}
