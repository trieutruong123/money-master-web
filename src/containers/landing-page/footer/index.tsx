import { FlipToBackRounded } from '@mui/icons-material';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { Link } from 'shared/components';
import { colorScheme } from 'utils/color-scheme';

interface IProps {
  content: any;
}


export default function LandingFooter({ content }: IProps) {
  const {service, ourAddress} = content;
  return (
    <section className="section" id="footer" style={{ paddingBottom: '0' }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        bgcolor={colorScheme.gray200}
      >
        <Grid container item md={8} xs={11} mt="2rem" justifyContent="start">
            <Grid item key={uuid()} md={6} sm={6} xs={10}>
              <Typography variant="h6" mb="1rem">
                {service.title}
              </Typography>
              <List>
                  <ListItem key={uuid()}>
                    <ListItemText>
                      <Link href='/'>{service.home}</Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem key={uuid()}>
                    <ListItemText>
                      <Link href='/#service'>{service.service}</Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem key={uuid()}>
                    <ListItemText>
                      <Link href='/#about'>{service.about}</Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem key={uuid()}>
                    <ListItemText>
                      <Link href='/docs'>{service.docs}</Link>
                    </ListItemText>
                  </ListItem>
              </List>
            </Grid>
        </Grid>
        <Grid
          container
          item
          md={8}
          xs={11}
          mb="2rem"
          flexDirection="column"
          justifyContent="start"
        >
          <Typography variant="h6" mb="1rem">
          {ourAddress.title}
          </Typography>
          <br />
          <Typography variant="h6" color={colorScheme.gray600}>
          {ourAddress.address}&#10;
          </Typography>
          <Typography variant="h6" color={colorScheme.gray600}>
            {ourAddress.email}: portfolio_management@gmail.com&#10;
          </Typography>
          <Typography variant="h6" color={colorScheme.gray600}>
            {ourAddress.phone}: +84 376 255 317
          </Typography>
        </Grid>
      </Grid>
    </section>
  );
}


