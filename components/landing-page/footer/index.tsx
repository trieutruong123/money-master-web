import { FlipToBackRounded } from "@mui/icons-material";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "components";
import { colorScheme } from "utils/color-scheme";

export default function Footer() {
  
  return (
    <section className="section" id = 'footer' style = {{paddingBottom:'0'}}>
      <Grid container alignItems='center' justifyContent = 'center' bgcolor={colorScheme.gray200}>
        <Grid container item md={8} xs ={11} mt='2rem' justifyContent = 'start'>
          {links.map((link, key) => (
            <Grid item key={key} md={6} sm={6} xs = {10}>
              <Typography variant="h6" mb="1rem">
                {link.title}
              </Typography>
              <List>
                {link.child.map((fLink, key) => (
                  <ListItem key={key}>
                    <ListItemText>
                      <Link href={fLink.link}>{fLink.title}</Link>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
        <Grid container item md={8} xs ={11}mb = '2rem' flexDirection = 'column' justifyContent = 'start'>
          <Typography variant="h6" mb="1rem" >
            OUR ADDRESS
          </Typography>
          <br/>
          <Typography
            variant="h6"
            color={colorScheme.gray600}
          >
            235, Nguyen Van Cu, Quan 5, TP. Ho Chi Minh&#10;
          </Typography>
          <Typography variant="h6"color={colorScheme.gray600}>
            Email: portfolio_management@gmail.com&#10;
          </Typography>
          <Typography variant="h6" color={colorScheme.gray600}>
              Phone: +84 376 255 317
            </Typography>
        </Grid>
      </Grid>
    </section>
  );
}

const links = [
  {
    id: 1,
    title: "FEATURE",
    child: [
      { title: "HOME", link: "/" },
      { title: "FEATURE", link: "/#feature" },
      { title: "ABOUT", link: "/#about" },
    ],
  },
  {
    id: 2,
    title: "ABOUT US",
    child: [
      { title: "CONTACT US", link: "/" },
      { title: "FAQs", link: "/" },
      { title: "PRIVACY POLICY", link: "/" },
    ],
  },
];