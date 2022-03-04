import * as React from "react";
import {
  Accordion,
  Box,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";
import { Link } from "components";

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
              <Link href={`/portfolio/test`}>
                <Button color="success" variant="contained">Detail</Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Accordion>
    </Box>
  );
}
