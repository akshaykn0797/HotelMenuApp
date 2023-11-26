import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import MTabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { Loader } from "components/Atoms/Loader";

function TabPanel(props) {
  const { children, value, index, loading, panelStyle, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2, ...panelStyle }}>{loading ? <Loader /> : children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  loading: PropTypes.bool,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const Tabs = ({ items, panelStyle }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MTabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {(items || []).map((item, index) => (
            <Tab label={item.label} sx={{ textTransform: "none", fontWeight: 600 }} key={item.label} {...a11yProps(index)} />
          ))}
        </MTabs>
      </Box>
      <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {(items || []).map((item, index) => (
          <TabPanel
            value={value}
            index={index}
            loading={item.loading}
            panelStyle={panelStyle}
            key={`panel-item-${index + 1}`}
          >
            {item.content}
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  );
};
