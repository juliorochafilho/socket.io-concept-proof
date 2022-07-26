import { Server } from "Socket.IO";

// export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
//   if (!res.socket.server.io) {
//     console.log("New Socket.io server...");
//     // adapt Next's net Server to http Server
//     const httpServer: NetServer = res.socket.server as any;
//     const io = new ServerIO(httpServer, {
//       path: "/api/socketio",
//     });
//     // append SocketIO server to Next.js socket server response
//     res.socket.server.io = io;
//   }
//   res.end();
// };

export default async (req, res) => {
  if (!res.socket.server.io) {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connect", (user) => {
      io.emit("message", "Hello from server");
      console.log({ user } + " just connected :D");
    });

    io.on("disconect", (user) => {
      console.log({ user } + " disconected :(");
    });

    io.on("message", (message) => {
      io.emit("message", message);
    });
  }
  res.end();
};
