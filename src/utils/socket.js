import io from "socket.io-client";
export default io.connect(process.env.REACT_APP_WEB_SOCKET_SERVER, { credentials: true, });
