import { createServer } from 'node:http'; // importing http module to create server

const hostname = '127.0.0.1' /* Setting up address, i.e where to run this server */
const port = 3000

// creating server
const myServer = createServer((req, res) => { // req : info about request, res: the response server going to send back
    res.statusCode = 200 // success
    res.setHeader('Content-Type', 'text/plain') // telling browser what is the type of content it going to recive
    res.end('Hello from my server') // message end response
})

myServer.listen(port, hostname, () => {
    console.log(`My server is running at http ${hostname}:${port}`) // starting the server
})