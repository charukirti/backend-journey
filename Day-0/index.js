import {createServer} from 'node:http';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);

    if(req.url === '/') {
        res.end('Welcome to the homepage')
    } else if(req.url === '/about') {
        res.end('This is the about page')
    } else {
        res.statusCode = 404
        res.end('404 - Page not found')
    }

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain')
    // res.end('Hello World')
})


server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})