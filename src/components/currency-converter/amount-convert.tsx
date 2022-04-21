import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { height } from "@mui/system";
import React from "react";
import classes from "./amount-convert.module.css";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

function AmountConvert() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div className={classes.content}>
      <div className={classes.amount_group}>
        <TextField
          label="Amount"
          id="outlined-basic"
          sx={{ borderRadius: "2%" }}
        ></TextField>

        <Select
          sx={{ borderLeft:"0%" }}
          defaultValue={30}
          variant="outlined"
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </div>
      <CompareArrowsIcon sx={{margin:"10px", fontSize:"30px",color:"blue"}}/>
      <div className={classes.amount_group}>
        <TextField
          label="Amount"
          id="outlined-basic"
          sx={{ borderRadius: "2%" }}
        ></TextField>

        <Select
          sx={{ borderLeft:"0%" }}
          defaultValue={30}
          variant="outlined"
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </div>
    </div>
  );
}

export default AmountConvert;
