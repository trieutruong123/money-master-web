import React, { lazy, Suspense, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { TabPanel } from 'shared/components';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

const PDEditPortfolioInfo = lazy(() => import('./pd-edit-portfolio-info'));

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const PDSettingsTab = observer(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (<>
    <Grid container display="flex" justifyContent="center" width='100%' padding='0' margin='0'>
      <Grid xs={4} sm={2}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', }}
        >
          <Tab label="Portfolio" {...a11yProps(0)} />
        </Tabs>
      </Grid>
      <Grid xs={8} sm={10}>
        <TabPanel value={value} index={0}>
          <Suspense fallback={<></>}>
            <PDEditPortfolioInfo />
          </Suspense>
        </TabPanel>
      </Grid>

    </Grid>
  </>);
});

export default PDSettingsTab;
