import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { v4 as uuid } from "uuid";
import { AiOutlineEuroCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { Link } from "components";
import { getRandomPallete } from "utils/color-scheme";

export default function PortfolioCard(props: any) {
  const { id, name, initBalance } = props;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Accordion>
        <Container
          maxWidth="lg"
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="h5">
                {name}
              </Typography>
              <Typography color="textPrimary" variant="h5">
                {initBalance}
              </Typography>
            </Grid>
            <Grid item>
              <Link href={`${id}`}>
                <Button color="success" variant="contained">Detail</Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Accordion>
    </Box>
  );
}
