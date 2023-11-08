/// Material Components
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// `SuspenseLoader` is the function to show the user Loading Indicator along with a generic loading message
export const SuspenseLoader = ({ loadingText }) => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                textAlign: "center",
            }}
            className="z-index-super-visible"
        >
            <Box mt={1.5} mb={1.5}>
                <CircularProgress size={50} />
            </Box>
            <Typography variant="h5" component="div" gutterBottom>
                {loadingText ? loadingText : "Please wait while the data is being loaded"}
            </Typography>
        </Box>
    );
}
