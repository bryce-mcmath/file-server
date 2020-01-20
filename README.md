# file-server

> Basic implementation of low level file transfer using TCP

**Note: These instructions assume you have git and node installed on your local machine.**

To run on your local machine, in your terminal:

`git clone https://github.com/bryce-mcmath/file-server.git`

Change into project's root directory:

`cd file-server`

Run the server:

`node server.js`

Open a second terminal in the same directory and run the client:

`node client.js wilson.jpg`

The third argument (here wilson.jpg) can be any filename that exists in the /files directory
