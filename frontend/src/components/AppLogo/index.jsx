import Box from "@mui/material/Box";

const logoSizes = {
  sm: "2.5rem",
  md: "5rem",
  lg: "8rem",
};

const AppLogo = ({ size = "sm", style }) => {
  return (
    <Box sx={{ width: logoSizes[size], mr: 1, ...style }}>
      {/* <img
        alt="app logo"
        width="100%"
      /> */}
    </Box>
  );
};

export default AppLogo;
