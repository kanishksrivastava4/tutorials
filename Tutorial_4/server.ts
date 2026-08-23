import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

// When a client connects
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Listen for a message from the client
  socket.on('client-message', (data) => {
    console.log('Received from client:', data);

    // Broadcast the message to ALL connected clients
    io.emit('server-message', {
      text: 'Server received: ' + data.text,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});