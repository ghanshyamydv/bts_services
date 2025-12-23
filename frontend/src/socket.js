// socket.js
import { io } from "socket.io-client";

export const socket = io("http://localhost:4000", {
  autoConnect: false,
  transports: ["websocket"],
});


// import { io } from "socket.io-client";

// Replace with your backend server URL
// export function connectWS(){
//   return io("http://localhost:4000");
// } 

// Optional: log connection status
// socket.on("connect", () => {
//   console.log("Connected to server with id1:", socket.id);
// });

// socket.on("disconnect", () => {
//   console.log("Disconnected from server");
// });
