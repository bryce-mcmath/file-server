const net = require('net');
const fs = require('fs');

const server = net.createServer();

// When a connection is made to the server
server.on('connection', client => {
  // and data is recieved from that connection (expect filename)
  client.on('data', filename => {
    // Check if the filename submitted exists in our files folder
    if (fs.existsSync(`./files/${filename}`)) {
      // If it does, create a readstream
      let readStream = fs.createReadStream(`./files/${filename}`);

      readStream
        // While there is still data to be read
        .on('readable', function() {
          // Write it to client
          client.write(readStream.read());
        })
        // When finished
        .on('end', () => {
          // End connection with client
          client.destroy();
        });
    } else {
      client.write('Error: that file does not exist');
      // End connection with client
      client.destroy();
    }
  });
});

server.listen(5050, () => {
  console.log('Server listening on port 5050');
});
