import React from "react";
import Image from "next/image";
import {
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { colorScheme } from "utils/color-scheme";
import { Fade } from "react-awesome-reveal";
import styled from './style/index.module.css';

interface IProps {
  content: any;
}

export default function LandingBrandIntro({ content }: IProps) {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <section id="intro-section" className={styled.ContentBlockSection}>
      <Fade direction="right">
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            mx="1rem"
            lg={5}
            md={6}
            sm={8}
            xs={12}
            p='0rem'
            margin="1.5rem 0 2rem"
          >
            <Typography
              variant="h2"
              textTransform="uppercase"
              textAlign = 'left'
              color={colorScheme.theme}
              fontSize="52px"
              mb="1.5rem"
            >
              {content?.brand}
            </Typography>
            <Typography textAlign = 'left' variant="h5" mb="1.5rem">
              {content?.desc}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                scrollTo("/#");
              }}
              display="inline-block"
            >
              {content?.findOutMore}{" "}
              <span style={{ alignItems: "left", marginLeft: "0.5rem" }}>
                &#8594;
              </span>
            </Button>
          </Grid>
          <Grid item lg={5} md={6} sm={8} xs={11} mt={isLg ? "1rem" : "0rem"}>
            <Image
              id="landing-image-01"
              src="/images/landing-image-01.png"
              alt="landing image 01"
              width={"500"}
              height={"450"}
              priority
            />
          </Grid>
        </Grid>
      </Fade>
    </section>
  );
}
