const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// Handle incoming socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming chat messages
  socket.on('chat message', (message) => {
    console.log('Message received: ', message);
    
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 3000;
http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
