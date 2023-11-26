import { useContext } from "react";
import { GlobalContext } from "context/globalContext";

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}