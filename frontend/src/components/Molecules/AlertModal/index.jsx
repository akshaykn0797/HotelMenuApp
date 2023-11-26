import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { Button } from "components/Atoms/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertModal = ({
  open,
  handleClose,
  children,
  title,
  handleConfirm,
  confirmationText = "Save",
  hideConfirmation,
  loading,
  ...rest
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      {...rest}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1rem" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Cancel
        </Button>
        {!hideConfirmation && (
          <Button onClick={handleConfirm} loading={loading}>
            {confirmationText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
