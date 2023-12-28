const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 8080;


// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

app.post('/cubedb.txt', (req, res) => {
    const cubedata = req.body.cubedata;
    const filepath = 'cubedb.txt';
    console.log(`filepath: ${filepath}`);
    const newData = cubedata+'\n';
    fs.appendFile(filepath, newData, (err) => {
        if (err) {
            console.error('error writing to file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Data written to file');
            res.status(200).send('Data written to file');
            console.log(`cubedata: ${newData}`);
        }
    });
});


// Serve static files from the public directory

// Define your Express.js routes here
app.get('/index.html', (req, res) => {
    res.json({ message: 'This is an API endpoint' });
});
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Create a server using the http module
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/index.html`);
});
