import React, { useEffect, useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import { useSnackbar } from 'notistack';

//My components
import Constants from '../Constants';
import useAuth from '../../context/AuthContext';

import {
  sendComment,
} from '../../socketio.serivce';

export default function Like({ productId, commentId, page, authUserId, onHandleLikeRes }) {
  const auth = useAuth();
  let history = useHistory();
  let location = useLocation();
  const [like, setLike] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleLikeComment = () => {
    setLike(prevState => !prevState);
    setIsClicked(true);
  }

  useEffect(() => {
    if (isClicked) {
      postLike(auth, commentId, page, productId, history, location, onHandleLikeRes, enqueueSnackbar, setIsClicked);
    }
    // eslint-disable-next-line
  }, [isClicked]);

  useEffect(() => {
    if (authUserId !== -1) {
      setLike(true);
    }
  }, [authUserId]);

  return (
    <IconButton edge="end" aria-label="like"
      style={{
        color: `${like ? `${Constants.GREEN}` : ''}`,
      }}
      onClick={handleLikeComment}
    >
      <ThumbUpIcon />
    </IconButton>
  )
}

const postLike = async (
  auth, commentId, page, productId, history, location,
  onHandleLikeRes,
  enqueueSnackbar,
  setIsClicked
) => {
  setIsClicked(false);
  if (auth.user) {
    const likeRes = await axios.put(process.env.REACT_APP_REMOTE_URL + '/comments/' + productId, {
      userId: auth.user._id,
      commentId: commentId,
    });
    //console.log("likeRes = ", likeRes.data);
    auth.setCommentPage("/comments/" + productId + "?page=" + page);
    sendComment(likeRes.data);
    onHandleLikeRes(likeRes.data);
  } else {
    enqueueSnackbar('Bạn cần đăng nhập để tiếp tục', {
      variant: 'warning'
    });

    history.push({
      pathname: "/sign-in",
      state: { from: location }
    });
  }

};
