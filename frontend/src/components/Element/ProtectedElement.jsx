import { useNavigate } from "react-router-dom";
import { SuspenseLoader } from "components/Molecules/SuspenseLoader";
import MainLayout from "layouts/MainLayout";
import { useAuthControls } from "hooks/useAuthControls";
import { useEffect, useState } from "react";
import { useGlobalContext } from "hooks";
import api from "api"
import getSingletonSocket from "singleton/socket";


const ProtectedElement = ({ component: Component, hideContainer, ...rest }) => {
  const { setTokens, tokens } = useGlobalContext()
  const [isLoading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { getTokens } = useAuthControls()
  useEffect(() => {
    function onConnect() {
      console.log("Socket is connected")
    }
    function onConnectError(err) {
      console.log("The socket could not connect", err)
      console.log("The socket could not connect name", err.name)
      console.log("The socket could not connect message", err.message)

    }
    function onDisconnect() {
      console.log("Socket is disconnected")
    }
    // console.log("Entered Procted useEffect")
    // Try to fetch the tokens from the cookies
    const authenticateUser = async () => {
      try {
        // Ask the server to extract the cookies from our headers and return them
        const fetchedTokens = getTokens()
        if (!fetchedTokens) {
          navigate("/login")
        }
        else {
          // console.log("I am now setting tokens in context")
          setTokens(fetchedTokens)
          // console.log("I Have now successfully set tokens in context")
        }
      }
      catch (e) {
        // In case we do not have tokens in the cookies the user needs to be redirected to login page
        navigate("/login")
      }
    }
    setLoading(true)
    // If there are no tokens we will try to authenticate the user and fetch tokens
    if (!tokens) {
      // console.log(" I am authenticating the user")
      authenticateUser()
    }
    // If we do have tokens then we will add the authorisation tokens to the header of our axios instance
    else {
      // Get the socket instance
      const socket = getSingletonSocket(tokens.accessToken)
      // Set up basic socket functions
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("connect_error", onConnectError);
      // console.log("I am attaching the headers")
      api.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;
      // console.log("I have set the tokens in the header here")
    }
    setLoading(false)
    return () => { }
  }, [tokens])

  if (isLoading || !tokens) {
    return <SuspenseLoader />;
  }
  // console.log("I am now rendering the compoenets", tokens)
  return (
    <MainLayout hideContainer={hideContainer}>
      <Component {...rest} />
    </MainLayout>
  );
};

export default ProtectedElement;
