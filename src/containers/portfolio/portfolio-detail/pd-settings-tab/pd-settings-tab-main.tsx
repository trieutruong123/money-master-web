import React, { lazy, Suspense, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { TabPanel } from 'shared/components';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { content as i18n } from 'i18n';

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
  const router = useRouter();
  const { locale } = router;
  const content = locale === 'vi' ? i18n['vi'].portfolioDetailPage : i18n['en'].portfolioDetailPage;

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
          <Tab label={content.settings.portfolio} {...a11yProps(0)} />
        </Tabs>
      </Grid>
      <Grid xs={8} sm={10}>
        <TabPanel value={value} index={0}>
          <Suspense fallback={<></>}>
            <PDEditPortfolioInfo content={content.settings} />
          </Suspense>
        </TabPanel>
      </Grid>

    </Grid>
  </>);
});

export default PDSettingsTab;
