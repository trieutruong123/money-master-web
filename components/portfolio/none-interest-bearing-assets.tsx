import * as React from 'react';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { v4 as uuid } from 'uuid';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IoLogoBitcoin } from 'react-icons/io';
import { AiFillGold, AiOutlineStock } from 'react-icons/ai';
import { Link } from 'components';

const categories = [
  {
    id: uuid(),
    content: 'Cryto Currency',
    link: '/portfolio/none-interest/crypto-currency',
    component: <IoLogoBitcoin style={{ height: '2rem', width: '2rem' }} />,
    total: '$23k',
    color: 'warning.main',
    profitRate: '5.2%',
    termRange: 'day',
    error: true,
  },
  {
    id: uuid(),
    content: 'Stocks',
    link: '/portfolio/none-interest/stock',
    component: <AiOutlineStock style={{ height: '2rem', width: '2rem' }} />,
    total: '$19k',
    color: 'error.main',
    profitRate: '1.2%',
    termRange: 'day',
    error: false,
  },
  {
    id: uuid(),
    content: 'Gold',
    link: '/portfolio/none-interest/gold',
    component: <AiFillGold  style={{ height: '2rem', width: '2rem' }}/>,
    total: '5.2 taels',
    color: 'warning.dark',
    profitRate: '0.8%',
    termRange: 'day',
    error: false,
  },
];

export default function NoneInterestBearingAssets() {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Accordion expanded={expanded}>
        <AccordionSummary
          expandIcon={
            <IconButton onClick={() => setExpanded(!expanded)}>
              <ExpandMoreIcon />
            </IconButton>
          }
          aria-controls="panel1a-content"
          id="panel1a-header-none-interest-bearing-assets"
        >
          <Typography variant="h5">None interest-bearing assets</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              {categories.map((item) => {
                return (
                  <Grid key={item.id} item lg={4} sm={6} xl={4} xs={12}>
                    <Link href={item.link}>
                      <Card sx={{ border: '0.5rem' }}>
                        <CardContent>
                          <Grid
                            container
                            spacing={3}
                            sx={{ justifyContent: 'space-between' }}
                          >
                            <Grid item>
                              <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="h5"
                              >
                                {item.content}
                              </Typography>
                              <Typography color="textPrimary" variant="h5">
                                {item.total}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Avatar
                                sx={{
                                  backgroundColor: item.color,
                                  height: 56,
                                  width: 56,
                                }}
                              >
                                {item.component}
                              </Avatar>
                            </Grid>
                          </Grid>
                          <Box
                            sx={{
                              pt: 2,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {item.error ? (
                              <ArrowDownwardIcon color="error" />
                            ) : (
                              <ArrowUpwardIcon color="success" />
                            )}
                            <Typography
                              color={item.error ? 'error' : 'success'}
                              sx={{
                                mr: 1,
                              }}
                              variant="body2"
                            >
                              {item.profitRate}
                            </Typography>
                            <Typography color="textSecondary" variant="caption">
                              Since last {item.termRange}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
