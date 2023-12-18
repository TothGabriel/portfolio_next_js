import { Server } from "socket.io";

// Fonction pour émettre une mise à jour en temps réel
const sendUpdate = (eventName, data) => {
  if (res.socket.server.io) {
    res.socket.server.io.emit(eventName, data);
  }
};

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("Setting up socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    // Ajouter la fonction sendUpdate au contexte global
    res.socket.server.io = io;
    res.socket.server.sendUpdate = sendUpdate;
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
