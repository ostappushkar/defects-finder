import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Histogram from './Histogram';
import Cumulative from './Cumulative';
import CumulativeClusterized from './CumulativeClusterized';
import HistogramClusterized from './HistogramClusterized';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example">
          <Tab label="Histogram" {...a11yProps(0)} />
          <Tab label="Cumulative Histogram" {...a11yProps(1)} />
          <Tab label="Clusterized Histogram" {...a11yProps(2)} />
          <Tab label="Clusterized Cumulative Histogram" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Histogram />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Cumulative />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <HistogramClusterized />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <CumulativeClusterized />
      </TabPanel>
    </>
  );
}
