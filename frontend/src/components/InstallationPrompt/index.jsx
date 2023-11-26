import { useEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { Button } from "components/Atoms/Button";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

let deferredPrompt;
const InstallationPrompt = () => {
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("INSTALL: Success");
    });
  }, []);

  const handleInstallClick = (e) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };

  return (
    <Box>
      {deferredPrompt && installable && (
        <Alert
          sx={{ position: "fixed", bottom: 9, zIndex: 9999, width: "90%" }}
          severity="info"
          action={
            <Button onClick={handleInstallClick} size="small">
              Install
            </Button>
          }
        >
          <Box sx={{ display: "flex" }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mr: 2 }}>
              Please install app.
            </Typography>
            <CloseIcon onClick={() => setInstallable(false)} />
          </Box>
        </Alert>
      )}
    </Box>
  );
};

export default InstallationPrompt;
