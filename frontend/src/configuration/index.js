const configuration = {
  auth0Domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
  auth0ClientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '', 
  apiUrl: process.env.REACT_APP_API_BASE_URL || '', 
  squareAppId: process.env.REACT_APP_SQUARE_APP_ID || '', 
  squareLocationId: process.env.REACT_APP_SQUARE_LOCATION_ID || '', 
};

export default configuration;
