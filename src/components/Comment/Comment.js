import React, { useEffect, useState } from 'react';

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
import { Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';

import axios from 'axios';

import { useHistory, useLocation } from 'react-router';

import { useSnackbar } from 'notistack';

import dateFormat from 'dateformat';

//My components
import CommentPagination from '../Comment/CommentPaginaion';
import useAuth from '../../context/AuthContext';
import Like from './Like';

import {
  initiateSocketConnection,
  disconnectSocket,
  subscribeToChat,
  sendComment,
  displayComment,
} from '../../socketio.serivce';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Comment({productId}) {
  const classes = useStyles();
  const theme = useTheme();
  const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [content, setContent] = useState("");
  const [submit, setSubmit] = useState("");
  const [comments, setComments] = useState([]);
  const [cmtPagination, setCmtPagination] = useState({});
  const [response, setResponse] = useState(null);
  const [likeRes, setLikeRes] = useState("-1");
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();
  let history = useHistory();
  let location = useLocation();

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auth.user) {
      if (content === "") {
        enqueueSnackbar('Nội dung không được để trống!', {
          variant: 'warning'
        });
        return;
      }

      try {
        sendComment(content);
        setContent("");

        const res = await axios.post('http://localhost:3001/comments', {
          userId: auth.user._id,
          avatar: auth.user.avatar,
          name: auth.user.name,
          productId: productId,
          content: content,
          postDate: new Date(),
        });
        setResponse(res.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      enqueueSnackbar('Bạn cần đăng nhập để tiếp tục', {
        variant: 'warning'
      });

      history.push({
        pathname: "/sign-in",
        state: { from: location }
      });
    }
  }

  const handleChangeCmtPage = async (url) => {
    const res = await axios.get('http://localhost:3001' + url);
    setCmtPagination(res.data.paginationInfo);
    setComments(res.data.comments);
  }

  //setState in useEffect => infinity loop

  useEffect(() => {
    const fetchComment = async (productId) => {
      const url = auth.commentPage ? `http://localhost:3001${auth.commentPage}`
        : `http://localhost:3001/comments/${productId}`;
      const res = await axios.get(url);

      setCmtPagination(res.data.paginationInfo);
      setComments(res.data.comments);
    }

    if (productId) {
      fetchComment(productId);
    }

  }, [productId, submit, response, likeRes, auth.commentPage]);// NEED HANLDE

  useEffect(() => {
    initiateSocketConnection();

    subscribeToChat((err, data) => {
      console.log(data);
    });

    return () => {
      disconnectSocket();
    }
  }, []);

  useEffect(() => {
    displayComment((err, comment) => {
      setSubmit(comment);
    });
  }, []);

  return (<Grid container>
    <Grid item xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="flex-end" spacing={1}>
          <Grid item xs={12}>
            <TextField variant="outlined"
              fullWidth
              type="text"
              value={content}
              onChange={handleChangeContent}
            />
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              type="submit"
            >Bình luận</Button>
          </Grid>
        </Grid>
      </form>

    </Grid>
    <Grid item xs={12}>
      <Typography variant="body1">
        {cmtPagination.total_results === 0 ? 'Chưa có bình luận về sản phẩm này.'
          : `${cmtPagination.total_results} bình luận`}
      </Typography>
    </Grid>

    {cmtPagination.total_results !== 0 && <>
      <List className={classes.root}>
        {comments.map(comment => (
          <div key={comment._id}>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" style={{
              flexWrap: "wrap"
            }}>
              <ListItemAvatar style={{ width: 50 }}>
                <Avatar alt="Remy Sharp" src={comment.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={<b>{comment.name}</b>}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {dateFormat(comment.postDate, "dd/mm/yyyy h:MM:ss TT")}
                    </Typography>
                  </React.Fragment>
                }
              />

              <Grid container style={{ paddingLeft: 56 }}>
                <Grid item xs={12} >
                  <Typography variant="body1">
                    {comment.content}
                  </Typography>
                </Grid>
                <Grid item xs={12} >
                  <Typography variant="subtitle2"
                    style={{
                      paddingTop: 10,
                      color: "#AEB6BF",
                    }}>
                    <i>{comment.like.length} lượt thích</i>
                  </Typography>
                </Grid>
              </Grid>
              <ListItemSecondaryAction>
                <Like
                  productId={productId}
                  commentId={comment._id}
                  userId={comment.userId}
                  onHandleLikeRes={setLikeRes}
                  authUserId={comment.like.indexOf(auth.user ? auth.user._id : "")}
                  page={cmtPagination.current_page}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </div>))}
      </List>
      <Grid container item xs={12}
        justifyContent={isDownXS ? "center" : "flex-end"}
      >
        <CommentPagination
          productId={productId}
          pagination={cmtPagination}
          onChangeCmtPage={handleChangeCmtPage}
        />
      </Grid>
    </>}
  </Grid>);
}
