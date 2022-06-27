import { useState } from 'react';
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  Label,
  Outline,
} from './styles';
import { SvgIcon } from '../custom/SvgIcon';
import { Drawer, Grid } from '@mui/material';
import Container from '../custom/Container';
import MenuItem from './menu-item';

const Header = ({ t }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpenDrawer(open);
    };

  return (
    <HeaderSection>
      <Container>
        <Grid container justifyContent="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" width="101px" height="64px" />
          </LogoContainer>
          <NotHidden>
            <MenuItem closeDrawer={() => setOpenDrawer(false)} />
          </NotHidden>
          <Burger onClick={()=>setOpenDrawer(!openDrawer)}>
            <Outline />
          </Burger>
        </Grid>
        <Drawer
          anchor={'right'}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onClick={toggleDrawer('right', true)}
        >
          <Grid container style={{ marginBottom: '2.5rem' }}>
            <Label onClick={() => setOpenDrawer(false)}>
              <Grid item xs={12}>
                <Menu>Menu</Menu>
              </Grid>
              <Grid item xs={12}>
                <Outline />
              </Grid>
            </Label>
          </Grid>
          <MenuItem closeDrawer={() => setOpenDrawer(false)} />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default Header;
