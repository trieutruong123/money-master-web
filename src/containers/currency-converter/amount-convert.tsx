import { MenuItem, TextField } from "@mui/material";

import React from "react";
import classes from "./amount-convert.module.css";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { getSupportedCurrencyList } from "shared/helpers/currency-info";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IProps {
  sourceAmount: number;
  targetAmount: number;
  onSourceCurrencyChange: (symbol: string) => void;
  onTargetCurrencyChange: (symbol: string) => void;
  onSourceValueChange: (value: number) => void;
  onTargetValueChange: (value: number) => void;
}

function AmountConvert(props: IProps) {
  const [currencyList, setCurrencyList] = React.useState<any>({});
  React.useEffect(() => {
    getSupportedCurrencyList().forEach((currency) => {
      setCurrencyList((prevState: any) => ({
        ...prevState,
        [currency.code]: currency.name,
      }));
    });
  }, []);
  const [sourceCurrency, setSourceCurrency] = React.useState("USD");
  const [targetCurrency, setTargetCurrency] = React.useState("EUR");

  const handleCurrencySelectChange = (event: SelectChangeEvent) => {
    switch (event.target.name) {
      case "sourceCurrencySelect":
        if (event.target.value==targetCurrency) return;
        setSourceCurrency(event.target.value as string);
        props.onSourceCurrencyChange(event.target.value as string);
        break;
      case "targetCurrencySelect":
        if (event.target.value==sourceCurrency) return;
        setTargetCurrency(event.target.value as string);
        props.onTargetCurrencyChange(event.target.value as string);
        break;
    }
  };

  const handleValueChange = (event: any) => {
    event.target.value < 0 ? (event.target.value = 0) : event.target.value;
    switch (event.target.name) {
      case "sourceValue":
        props.onSourceValueChange(event.target.value as number);
        break;
      case "targetValue":
        props.onTargetValueChange(event.target.value as number);
        break;
    }
  };

  return (
    <div className={classes.content}>
      <div className={classes.amount_group}>
        <TextField
          onChange={handleValueChange}
          value={props.sourceAmount}
          name="sourceValue"
          label="Amount"
          id="outlined-basic"
          sx={{ borderRadius: "2%" }}
          type={"number"}
        ></TextField>

        <Select
          type={"number"}
          sx={{ borderLeft: "0%", width: "100px" }}
          value={sourceCurrency}
          name="sourceCurrencySelect"
          onChange={handleCurrencySelectChange}
          variant="outlined"
          renderValue={(p) => p}
        >
          {Object.keys(currencyList).map((currency, index) => (
            <MenuItem
              key={index}
              value={currency}
            >{`${currencyList[currency]} (${currency})`}</MenuItem>
          ))}
        </Select>
      </div>
      <CompareArrowsIcon
        sx={{ margin: "10px", fontSize: "30px", color: "blue" }}
      />
      <div className={classes.amount_group}>
        <TextField
          value={props.targetAmount}
          onChange={handleValueChange}
          name="targetValue"
          label="Amount"
          id="outlined-basic"
          sx={{ borderRadius: "2%" }}
          type="number"
        ></TextField>

        <Select
          sx={{ borderLeft: "0%", width: "100px" }}
          value={targetCurrency}
          name="targetCurrencySelect"
          onChange={handleCurrencySelectChange}
          variant="outlined"
          renderValue={(p) => p}
        >
          {Object.keys(currencyList).map((currency, index) => (
            <MenuItem
              key={index.toString()}
              value={currency}
            >{`${currencyList[currency]} (${currency})`}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default AmountConvert;
