import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { styled } from "@mui/material/styles";

import * as React from "react";
import { content } from "i18n";
import { observer } from "mobx-react-lite";
import PortfolioCard from "components/portfolio/portfolio-list/portfolio-card";
import Modal from "@mui/material/Modal";
import NewPortfolio from "components/portfolio/portfolio-list/modify-portfolio";
import { portfolioStore } from "shared/store";
import AmountConvert from "./amount-convert";
import ExchangeRateInfo from "./exchange-rate-info";
import CurrencyInfo from "./currency-info";

interface IProps {
  context: any;
}

const CurrencyConverter = observer(({ context }: IProps) => {
  const { locale } = context;
  const detail = locale === "vi" ? content["vi"] : content["en"];
  //const pageContent = detail.CurrencyConverterPage;

  return (
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
        <Typography sx={{ mb: 3}} align="center" variant="h4">
          CONVERTER
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Container>
      <Container maxWidth={false}>
        <AmountConvert/>
        <ExchangeRateInfo/>
        <CurrencyInfo/>
      </Container>
    </Box>
  );
});

export default CurrencyConverter;
