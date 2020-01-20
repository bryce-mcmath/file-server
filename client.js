const net = require('net');
const fs = require('fs');
const filename = process.argv[2];
// Create destination for transferred file to be written to
const writeStream = fs.createWriteStream(`./recieved/${filename}`);

const conn = net.createConnection({
  host: '127.0.0.1', // localhost default. Change this to request files from another IP
  port: 5050 // Make sure this matches server port
});

// After connecting
conn.on('connect', () => {
  // Send the requested filename
  conn.write(filename);
});

// When data is received from the server
conn.on('data', data => {
  // Write a chunk at a time
  console.log('Writing data chunk to file...');
  writeStream.write(data);
});

// When finished, notify and end connection
conn.on('end', () => {
  console.log('File transfer complete. Exiting.');
  conn.destroy();
});

// If error, notify and end connection
conn.on('error', () => {
  console.log('Error retrieving file. Exiting.');
  conn.destroy();
});
