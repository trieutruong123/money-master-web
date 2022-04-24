import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function DeletePortfolio(props: any) {
  const pageContent = props.content;
  const { openDeleteModal, handleCloseDeleteModal, deleteHandler } = props;
  return (
    <div>
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{pageContent.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {pageContent.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={deleteHandler}
            autoFocus
          >
            {pageContent.confirm}
          </Button>
          <Button onClick={handleCloseDeleteModal}>{pageContent.cancel}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeletePortfolio;
