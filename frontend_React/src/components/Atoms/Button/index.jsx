import React from "react";
import MButton from "@mui/material/Button";

import CircularProgress from "@mui/material/CircularProgress";

export const Button = ({
  variant = "contained",
  color = "primary",
  children,
  buttonText,
  loading,
  style,
  disabled,
  ...rest
}) => {
  return (
    <MButton
      variant={variant}
      color={color}
      disabled={disabled || loading}
      sx={{ textTransform: "none", ...style }}
      {...rest}
    >
      {loading && (
        <CircularProgress
          color="inherit"
          size="1.25rem"
          sx={{ marginRight: "0.8rem" }}
        />
      )}
      {buttonText}
      {children}
    </MButton>
  );
};
