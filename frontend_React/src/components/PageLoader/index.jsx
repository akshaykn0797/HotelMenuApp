import { useContext } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { GlobalContext } from "context/globalContext";
import FullPageLoader from "components/FullPageLoader";

const PageLoader = () => {
  const { pageLoading } = useContext(GlobalContext);
  if (!pageLoading) {
    return null;
  }
  return (<FullPageLoader />);
};

export default PageLoader;
