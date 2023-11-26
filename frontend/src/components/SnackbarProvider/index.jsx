import React from "react";
import PropTypes from "prop-types";
import { SnackbarProvider } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const SnackBarProviderWrapper = ({ children }) => {
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <SnackbarProvider
      maxSnack={3}
      ref={notistackRef}
      TransitionProps={{ direction: "up" }}
      action={(key) => (
        <IconButton
          aria-label="delete"
          size="large"
          color="secondary"
          onClick={onClickDismiss(key)}
        >
          <CloseIcon />
        </IconButton>
      )}
      autoHideDuration={5000}
    >
      {children}
    </SnackbarProvider>
  );
};

SnackBarProviderWrapper.propTypes = {
  children: PropTypes.node,
};

export default SnackBarProviderWrapper;
