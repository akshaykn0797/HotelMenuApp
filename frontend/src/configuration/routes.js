import HomeIcon from "@mui/icons-material/Home";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StorefrontIcon from "@mui/icons-material/Storefront";

export const NavigationLinks = {

}

export const BottomNavigationLinks = [
    { label: "Home", icon: <HomeIcon />, to: "/" },
    { label: "Orders", icon: <ReceiptLongIcon />, to: "/transactions" },
    { label: "Products", icon: <LunchDiningIcon />, to: "/products" },
    { label: "Account", icon: <LocalAtmIcon />, to: "/account" },
];