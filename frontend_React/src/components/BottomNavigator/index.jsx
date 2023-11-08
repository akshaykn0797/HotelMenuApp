import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { BottomNavigationLinks } from "configuration/routes";

export default function FixedBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState(0);

  useEffect(() => {
    const pathname = location.pathname;
    setValue(-1);
    BottomNavigationLinks.forEach((navigation, index) => {
      if (pathname === navigation.to) {
        setValue(index);
      }
    });
  }, [location.pathname]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
          const toUrl = BottomNavigationLinks[newValue].to;
          navigate(toUrl);
        }}
      >
        {BottomNavigationLinks.map((navigation) => (
          <BottomNavigationAction
            label={navigation.label}
            icon={navigation.icon}
            key={navigation.label}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontWeight: 600,
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
