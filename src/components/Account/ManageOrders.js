import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Constants from '../Constants';
import { Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        '& .MuiTab-textColorPrimary.Mui-selected': {
            color: Constants.GREEN,
        },
        '& .MuiTabs-indicator': {
            backgroundColor: Constants.GREEN,
        },
        '& .MuiTab-root': {
            minWidth: 150,
            fontWeight: 600,
        }
    },
    appbar: {
        boxShadow: "none",
        borderBottom: "1px solid #D5D8DC",
    },
}));

export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <AppBar position="static" color="default" className={classes.appbar}>
                {!isDownMD ?
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="manage orders tabs"
                        centered
                    >
                        <Tab label="Tất cả" {...a11yProps(0)} />
                        <Tab label="Chờ xác nhận" {...a11yProps(1)} />
                        <Tab label="Chờ lấy hàng" {...a11yProps(2)} />
                        <Tab label="Đang giao" {...a11yProps(3)} />
                        <Tab label="Đã giao" {...a11yProps(4)} />
                        <Tab label="Đã hủy" {...a11yProps(5)} />
                    </Tabs>
                    :
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="manage orders tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Tất cả" {...a11yProps(0)} />
                        <Tab label="Chờ xác nhận" {...a11yProps(1)} />
                        <Tab label="Chờ lấy hàng" {...a11yProps(2)} />
                        <Tab label="Đang giao" {...a11yProps(3)} />
                        <Tab label="Đã giao" {...a11yProps(4)} />
                        <Tab label="Đã hủy" {...a11yProps(5)} />
                    </Tabs>
                }

            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                Tất cả
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                Chờ xác nhận
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                Chờ lấy hàng
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
                Đang giao
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
                Đã giao
            </TabPanel>
            <TabPanel value={value} index={5} dir={theme.direction}>
                Đã hủy
            </TabPanel>
        </Paper>
    );
}