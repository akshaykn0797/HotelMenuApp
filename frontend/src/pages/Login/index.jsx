import { LoginSchema } from "schema";
import { Form, Input } from "components/Form";
import { useGlobalContext } from "hooks";
import { useState } from "react";
import { getErrorMessage } from "utils";
import { useAuthControls } from "hooks/useAuthControls";
import { Box, Button, Card, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const [error, setError] = useState(null);
  const { setPageLoading } = useGlobalContext();
  const { login } = useAuthControls();
  const navigate = useNavigate();
  const handleClick = async (data) => {
    console.log('Udupi Clicked');
    navigate('/degg')
  };
  const theme = useTheme()
  // console.log("theme is", theme)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        borderRadius: "10px",
        padding: "25px",
      }}
    >
      <Card
        sx={{
          padding: "15px",
        }}
      >
        <Typography
          style={{ marginBottom: "20px" }}
          fontWeight={600}
          variant="h6"
          textAlign="center"
        >
          Restaurants
        </Typography>
        {/* <Button onClick={handleClick}>Udupi Upahaar</Button> */}
        <Button onClick={async () => {
          navigate('/degg')
        }}>Degg</Button>
        <Button onClick={async () => {
          navigate('/hocco')
        }}>Hocco</Button>
        <Button onClick={async () => {
          navigate('/moes')
        }}>Moes</Button>
        <Button onClick={async () => {
          navigate('/pfchangs')
        }}>Pfchangs</Button>
        <Button onClick={async () => {
          navigate('/sushima')
        }}>Sushima</Button>

      </Card>
    </Box >
  );
}
