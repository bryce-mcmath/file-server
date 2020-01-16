const net = require('net');
const fs = require('fs');
const filename = process.argv[2];

const conn = net.createConnection({
  host: '127.0.0.1',
  port: 5050
});

// Send the inputted filename to the server
conn.write(filename);

// When data is received from the server
conn.on('data', data => {
  // Check if it's an error
  if (data.toString() === 'Error: that file does not exist') {
    // If it is, log it to the console
    console.log(data.toString());
    // And then end the connection
    conn.destroy();
  } else {
    // Otherwise write the recieved file into our receieved directory
    fs.writeFile(`./recieved/${filename}`, data, err => {
      if (err) {
        throw err;
      } else {
        console.log('The file has been saved');
      }
      // and then end the connection
      conn.destroy();
    });
  }
});
