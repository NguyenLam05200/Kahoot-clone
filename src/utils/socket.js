import io from "socket.io-client";
// export default io.connect('http://localhost:8080', { credentials: true, }); //test
export default io.connect(process.env.REACT_APP_WEB_SOCKET_SERVER, { credentials: true, });
