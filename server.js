const net = require('net');
const fs = require('fs');
const PORT = 5050;
const server = net.createServer();

// When a connection is made to the server
server.on('connection', client => {
  console.log('Connection made...');

  // and data is recieved from that connection (expect filename)
  client.on('data', filename => {
    console.log('Request received...');

    // Check if the filename submitted exists in our files folder
    if (fs.existsSync(`./files/${filename}`)) {
      console.log('File exists. Preparing to send...');

      // If it does, create a readstream
      const readStream = fs.createReadStream(`./files/${filename}`);

      readStream
        // While there is still data to be read
        .on('open', () => {
          console.log('Sending data to client...');

          // Write it to client
          readStream.pipe(client);
        })

        // When finished
        .on('close', () => {
          console.log('File transfer complete. Ending connection with client.');
          // End connection with client
          client.destroy();
        });
    } else {
      console.log('Error, file not found.');

      // Send error message to client
      client.write('Error: that file does not exist');

      // End connection with client
      console.log('Ending connection.');
      client.destroy();
    }
  });

  // If error
  client.on('error', () => {
    console.log('Error retrieving file. Ending connection.');
    client.destroy();
  });
});

// Close server if error
server.on('error', () => {
  console.log('Error. Closing server.');
  server.close();
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
