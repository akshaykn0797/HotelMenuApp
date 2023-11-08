
import { API_ROUTES } from "constants"
import { useNavigate } from "react-router-dom";
import { request } from "api";
import { useGlobalContext } from "./useGlobalContext";

export const useAuthControls = () => {
    // const router = useRouter()
    const { setTokens } = useGlobalContext()
    const navigate = useNavigate()

    const getTokens = () => {
        const tokens = JSON.parse(localStorage.getItem("authentication"))
        return tokens
    }

    const login = async ({ email, password }) => {
        const response = await request({ method: "POST", url: API_ROUTES.auth.login.endpoint, data: { email, password } })
        localStorage.setItem("authentication", JSON.stringify(response.data))
        setTokens(response.data)
        navigate("/")
    }

    const logout = () => {
        localStorage.clear();
        setTokens(null)
        navigate("/login")
    }

    return { logout, login, getTokens }
}