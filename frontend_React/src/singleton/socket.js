import { io } from "socket.io-client";
import configuration from "configuration";

const API_BASE_URL = configuration.apiUrl;

let client;
const getSingletonSocket = (token) => {
  if (client) return client;
  if (!token) return client;
  client = io(API_BASE_URL, {
    auth: {
      accessToken: token,
    },
    // transports: ['polling'],
    autoConnect: true,
    rejectUnauthorized: false,
    reconnection: true
  });
  return client;
};

export default getSingletonSocket;
