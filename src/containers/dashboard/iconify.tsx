import { Box } from "@mui/material";

interface IProps{
    icon:any,
    [x:string]: any;
   
}

export default function Iconify( {icon, sx, ...other }:IProps) {
    return <img src={icon} {...other} ></img>;
  }