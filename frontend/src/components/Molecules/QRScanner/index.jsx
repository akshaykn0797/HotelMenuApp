import { useRef } from "react";

import { useTheme } from "@mui/material/styles";
import { QrReader } from "react-qr-reader";
import Box from "@mui/material/Box";

import { FullScreenModal } from "components/Molecules/FullScreenModal";

export const QRScanner = ({ open, handleClose, onScan }) => {
  const theme = useTheme();

  const lastResult = useRef();

  const handleResult = (result) => {
    if (!result || !result.text) {
      return;
    }
    if (lastResult.current === result.text) {
      return;
    }
    lastResult.current = result.text;
    onScan(result.text);
  };

  if (!open) {
    return null;
  }

  return (
    <Box>
      <FullScreenModal
        title="Scanner"
        open={open}
        hideConfirmation
        handleClose={handleClose}
        sx={{
          "& .MuiDialog-paper": { backgroundColor: theme.palette.primary.main },
        }}
      >
        <Box>
          {open && (
            <QrReader
              onResult={handleResult}
              constraints={{ facingMode: "environment" }}
              containerStyle={{ width: "100%", maxWidth: "600px" }}
              ViewFinder={ScanOverlay}
            />
          )}
        </Box>
      </FullScreenModal>
    </Box>
  );
};

export const ScanOverlay = () => {
  return (
    <div
      style={{
        position: "absolute",
        borderWidth: "70px 70px",
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.48)",
        boxSizing: "border-box",
        inset: "0px",
        zIndex: "1",
      }}
    ></div>
  );
};
