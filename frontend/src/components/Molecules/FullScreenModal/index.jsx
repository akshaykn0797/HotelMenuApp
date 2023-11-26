import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";

import { Button } from "components/Atoms/Button";
import { Loader } from "components/Atoms/Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FullScreenModal = ({
  open,
  handleClose,
  children,
  title,
  handleConfirm,
  confirmationText = "SAVE",
  hideConfirmation,
  confirmLoading,
  dataLoading,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      {...rest}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, fontWeight: 600 }}
            variant="h6"
            component="div"
          >
            {title}
          </Typography>
          {!hideConfirmation && (
            <Button
              variant="contained"
              color="secondary"
              style={{
                color: theme.palette.common.white,
                "&.Mui-disabled": {
                  color: "rgba(255,255,255,0.7)",
                },
                fontWeight: 600,
                backgroundColor: "#2a74af",
                fontSize: "1rem"
              }}
              onClick={handleConfirm}
              loading={confirmLoading}
            >
              {confirmationText}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {dataLoading ? <Loader /> : children}
    </Dialog>
  );
};
