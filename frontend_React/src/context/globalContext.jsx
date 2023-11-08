/* eslint-disable react/require-default-props */
import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [pageLoading, setPageLoading] = useState(false)
  const [tokens, setTokens] = useState(null)
  return (
    <GlobalContext.Provider
      value={{ pageLoading, setPageLoading, tokens, setTokens }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node
};

export default GlobalContextProvider;
