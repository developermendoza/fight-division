import AppBar from '@material-ui/core/AppBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from "react";
import { useStyles } from "./styles";
import { Link, useHistory, useLocation } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function TabNavbar() {
  const matches = useMediaQuery('(min-width:600px)');
  const [value, setValue] = useState(0);
  const classes = useStyles();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      {matches &&
        <div>
      <AppBar className={classes.bottomNavbar}>
        <Container>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="bottom nav"
        >
          <LinkTab label="HOME"><Link to="/"></Link></LinkTab>
          <LinkTab label="EVENTS" href="/events" />
          {/* <LinkTab label="EVENTS" containerElement={<Link to="/events" />} value="/events" /> */}
          <LinkTab label="ABOUT" href="/about" {...a11yProps(2)} />
          <LinkTab label="UF RANKS" href="#topUsers" {...a11yProps(3)} />
        </Tabs>
        </Container>
      </AppBar>
      </div>
      }
    </div>
  )
}

export default TabNavbar
