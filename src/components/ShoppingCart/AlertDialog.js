import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
  const handleCloseWithNo = () => {
    props.setDialogStatus(false);
    props.setRemove(false);
  };

  const handleCloseWithYes = () => {
    props.setDialogStatus(false);
    props.setRemove(true);
  };

  return (
    <div>
      <Dialog
        open={props.dialogStatus}
        onClose={handleCloseWithNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Bạn chắc chắn muốn bỏ sản phẩm này?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithNo} variant="outlined" color="secondary">
            Không
          </Button>
          <Button onClick={handleCloseWithYes} variant="contained" color="secondary" autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
