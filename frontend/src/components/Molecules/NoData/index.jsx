import Typography from "@mui/material/Typography";
import { grey } from '@mui/material/colors';

export const NoData = ({ text, style }) => {

  return (
    <Typography
      sx={{
        minHeight: "15rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: grey[600],
        ...style
      }}
    >
      {text || "There is no data."}
    </Typography>
  );
};
