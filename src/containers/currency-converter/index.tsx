import { Box, Container, styled } from "@mui/material";

import * as React from "react";
import { content } from "i18n";
import { observer } from "mobx-react-lite";

import AmountConvert from "./amount-convert";
import ExchangeRateInfo from "./exchange-rate-info";
import CurrencyProfile from "./currency-profile";
import classes from "./index.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { cashDetailStore } from "shared/store";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface IProps {
  context: any;
}

const CurrencyConverter = observer(({ context }: IProps) => {
  const { locale } = context;
  const detail = locale === "vi" ? content["vi"] : content["en"];
  //const pageContent = detail.CurrencyConverterPage;
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [sourceAmount, setSourceAmount] = React.useState(1.0);
  const [targetAmount, setTargetAmount] = React.useState(1.0);

  const handleSourceCurrencyChange = async (symbol: string) => {
    cashDetailStore.setCurrencyId(symbol);
    cashDetailStore.forexMarketData=await cashDetailStore.fetchForexInfoByCode(cashDetailStore.currencyId);
    await cashDetailStore.fetchHistoricalMarketData();
    setTargetAmount(
      parseFloat(
        (
          sourceAmount * cashDetailStore.forexMarketData.response[0].c
        ).toPrecision(2)
      )
    );
  };

  const handleTargetCurrencyChange = async (symbol: string) => {
    cashDetailStore.setBaseCurrency(symbol);
    cashDetailStore.forexMarketData=await cashDetailStore.fetchForexInfoByCode(cashDetailStore.currencyId);
    await cashDetailStore.fetchHistoricalMarketData();
    setTargetAmount(
      parseFloat(
        (
          sourceAmount * cashDetailStore.forexMarketData.response[0].c
        ).toPrecision(4)
      )
    );
  };

  const handleSourceValueChange = (value: number) => {
    setSourceAmount(value);
    setTargetAmount(
      parseFloat(
        (value * cashDetailStore.forexMarketData.response[0].c).toPrecision(4)
      )
    );
  };

  const handleTargetValueChange = (value: number) => {
    setTargetAmount(value);
    setSourceAmount(
      parseFloat(
        (value / cashDetailStore.forexMarketData.response[0].c).toPrecision(4)
      )
    );
  };

  const fetchData = async () => {
    await cashDetailStore.fetchData();
    await cashDetailStore.fetchHistoricalMarketData();
    setTargetAmount(cashDetailStore.forexMarketData.response[0].c);
  };

  React.useEffect(() => {
    cashDetailStore.setBaseCurrency("EUR");
    cashDetailStore.setCurrencyId("USD");
    fetchData();
  }, []);

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
        <Typography sx={{ mb: 3 }} align="center" variant="h4">
          CONVERTER
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Container>
      <Container maxWidth={false}>
        <AmountConvert
          sourceAmount={sourceAmount}
          targetAmount={targetAmount}
          onSourceValueChange={handleSourceValueChange}
          onTargetValueChange={handleTargetValueChange}
          onSourceCurrencyChange={handleSourceCurrencyChange}
          onTargetCurrencyChange={handleTargetCurrencyChange}
        />
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            Exchange rate information
          </AccordionSummary>
          <AccordionDetails>
            <ExchangeRateInfo
              sourceAmount={sourceAmount}
              targetAmount={targetAmount}
              cashDetailStore={cashDetailStore}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            Currency Information
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label={`${cashDetailStore.currencyId} Profile Detail`} {...a11yProps(0)} />
                <Tab label={`${cashDetailStore.baseCurrencyCode} Profile Detail`} {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <CurrencyProfile currencyCode={cashDetailStore.currencyId}/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <CurrencyProfile currencyCode={cashDetailStore.baseCurrencyCode}/>
            </TabPanel>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  );
});

export default CurrencyConverter;
