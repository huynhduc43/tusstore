import React, { useState } from 'react';

import { Switch, Route, NavLink, useLocation } from 'react-router-dom';

import { Avatar, Collapse, Container, Divider, Grid, ListItemIcon, ListItemText, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from "@material-ui/icons/Favorite";

//My components
import Constants from '../Constants';
import BreadcrumbsCustom from '../BreadcrumbsCustom';
import ManageOrders from './ManageOrders';
import ChangePassword from './ChangePassword';
import Notifications from './Notifications';
import Profile from './Profile';
import Wishlist from './Wishlist';
import useAuth from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
	list: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
	},
	avatar: {
		margin: 5,
	},
	selected: Constants.BUTTON_CONTAINED,
	icon: {
		color: "#fff",
	},
	listItem: {
		"&:hover": {
			color: "#fff",
			backgroundColor: Constants.GREEN,
			"& .MuiListItemIcon-root": {
				color: "#fff",
			}
		},
		"&:active": {
			color: "#fff",
			backgroundColor: Constants.GREEN,
		},
	}
}));


export default function Account() {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	let location = useLocation();
	const auth = useAuth();

	const handleClick = () => {
		setOpen(!open);
	};

	const handleAutoClose = () => {
		setOpen(prevState => {
			if (prevState) return false;
		});
	}

	return (
		<Container maxWidth="lg">
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<BreadcrumbsCustom />
					</Paper>
				</Grid>
				<Grid item md={3} xs={12}>
					<Paper>
						<Grid container justifyContent="center" alignItems="center"
							style={{
								backgroundColor: "#f5f5f5",
								padding: 8,
							}}
						>
							<Grid item>
								<Avatar
									alt="avatar"
									src={auth.user.avatar ? auth.user.avatar
										: "https://res.cloudinary.com/dnbjep0mp/image/upload/v1631088180/user_hkinox.svg"}
									className={classes.avatar} />
							</Grid>
							<Grid item style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<Typography noWrap>{auth.user.email}</Typography>
							</Grid>
						</Grid>

						<Divider />

						<List
							component="nav"
							aria-labelledby="nested-list-subheader"
							className={classes.list}
						>
							<ListItem button onClick={handleClick}
								className={(!open && (location.pathname === "/account/profile" || location.pathname === "/account/change-password"))
									? classes.selected : ''}
							>
								<ListItemIcon>
									<PersonIcon
										className={(!open && (location.pathname === "/account/profile" || location.pathname === "/account/change-password"))
											? classes.icon : ''}
									/>
								</ListItemIcon>
								<ListItemText primary="Tài khoản" />
								{open ? <ExpandLess /> : <ExpandMore />}
							</ListItem>
							<Collapse in={open} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									<ListItem button className={[classes.nested, classes.listItem].join(" ")}
										component={NavLink}
										to='/account/profile'
										activeClassName={classes.selected}
									>
										<ListItemIcon>
										</ListItemIcon>
										<ListItemText primary="Thông tin" />
									</ListItem>
									<ListItem button className={[classes.nested, classes.listItem].join(" ")}
										component={NavLink}
										to="/account/change-password"
										activeClassName={classes.selected}
									>
										<ListItemIcon>
										</ListItemIcon>
										<ListItemText primary="Đổi mật khẩu" />
									</ListItem>
								</List>
							</Collapse>
							<ListItem button
								component={NavLink}
								to="/account/manage-orders"
								activeClassName={classes.selected}
								onClick={handleAutoClose}
								className={classes.listItem}
							>
								<ListItemIcon>
									{location.pathname === "/account/manage-orders" ?
										<AssignmentIcon className={classes.icon} /> : <AssignmentIcon />}
								</ListItemIcon>
								<ListItemText primary="Đơn hàng" />
							</ListItem>
							<ListItem button
								component={NavLink}
								to="/account/wishlist"
								activeClassName={classes.selected}
								onClick={handleAutoClose}
								className={classes.listItem}
							>
								<ListItemIcon>
									{location.pathname === "/account/wishlist" ?
										<FavoriteIcon className={classes.icon} /> : <FavoriteIcon />}

								</ListItemIcon>
								<ListItemText primary="Yêu thích" />
							</ListItem>
							<ListItem button
								component={NavLink}
								to="/account/notifications"
								activeClassName={classes.selected}
								onClick={handleAutoClose}
								className={classes.listItem}
							>
								<ListItemIcon>
									{location.pathname === "/account/notifications" ?
										<NotificationsIcon className={classes.icon} /> : <NotificationsIcon />}

								</ListItemIcon>
								<ListItemText primary="Thông báo" />
							</ListItem>
						</List>

					</Paper>
				</Grid>
				<Grid item md={9} xs={12} >
					<Switch>
						<Route path="/account/profile" component={Profile} />
						<Route path="/account/change-password" component={ChangePassword} />
						<Route path="/account/manage-orders" component={ManageOrders} />
						<Route path="/account/wishlist" component={Wishlist} />
						<Route path="/account/notifications" component={Notifications} />
					</Switch>
				</Grid>
			</Grid>
		</Container>
	)
}