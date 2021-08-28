import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { useTheme } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';

//My components
import PaginationCustom from '../PaginationCustom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export default function Comment() {
    const classes = useStyles();
    const theme = useTheme();
    const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));

    return (<Grid container>
        <Grid item xs={12}>
            <form>
                <Grid container justifyContent="flex-end" spacing={1}>
                    <Grid item xs={12}>
                        <TextField variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained">Bình luận</Button>
                    </Grid>
                </Grid>
            </form>

        </Grid>
        <Grid item xs={12}>
            <Typography variant="h6">32 bình luận</Typography>
        </Grid>

        <List className={classes.root}>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" style={{
                flexWrap: "wrap"
            }}>
                <ListItemAvatar style={{ width: 50 }}>
                    <Avatar alt="Remy Sharp" src="https://picsum.photos/200" />
                </ListItemAvatar>
                <ListItemText
                    primary={<b>Brunch</b>}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                24/08/2021
                            </Typography>
                        </React.Fragment>
                    }
                />

                <Grid container style={{ paddingLeft: 56 }}>
                    <Grid item xs={12} >
                        <Typography variant="body1">
                            Sản phẩm này rất phù hợp với nhu cầu của tôi...
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="subtitle2"
                            style={{
                                paddingTop: 10,
                                color: "#AEB6BF",
                            }}>
                            <i>10 lượt thích</i>
                        </Typography>
                    </Grid>
                </Grid>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <ThumbUpIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" style={{
                flexWrap: "wrap"
            }}>
                <ListItemAvatar style={{ width: 50 }}>
                    <Avatar alt="Remy Sharp" src="https://picsum.photos/200" />
                </ListItemAvatar>
                <ListItemText
                    primary={<b>Brunch</b>}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                24/08/2021
                            </Typography>
                        </React.Fragment>
                    }
                />

                <Grid container style={{ paddingLeft: 56 }}>
                    <Grid item xs={12} >
                        <Typography variant="body1">
                            Sản phẩm này rất phù hợp với nhu cầu của tôi...
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="subtitle2"
                            style={{
                                paddingTop: 10,
                                color: "#AEB6BF",
                            }}>
                            <i>10 lượt thích</i>
                        </Typography>
                    </Grid>
                </Grid>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <ThumbUpIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" style={{
                flexWrap: "wrap"
            }}>
                <ListItemAvatar style={{ width: 50 }}>
                    <Avatar alt="Remy Sharp" src="https://picsum.photos/200" />
                </ListItemAvatar>
                <ListItemText
                    primary={<b>Brunch</b>}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                24/08/2021
                            </Typography>
                        </React.Fragment>
                    }
                />

                <Grid container style={{ paddingLeft: 56 }}>
                    <Grid item xs={12} >
                        <Typography variant="body1">
                            Sản phẩm này rất phù hợp với nhu cầu của tôi...
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="subtitle2"
                            style={{
                                paddingTop: 10,
                                color: "#AEB6BF",
                            }}>
                            <i>10 lượt thích</i>
                        </Typography>
                    </Grid>
                </Grid>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <ThumbUpIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
        <Grid container item xs={12}
            justifyContent={isDownXS ? "center" : "flex-end"}
        >
            <PaginationCustom pagination={{
                total_pages: 1,
            }}/>
        </Grid>
    </Grid>);
}
