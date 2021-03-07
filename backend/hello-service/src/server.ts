import http from 'http';

const port = 3000;

const server = http.createServer((_req, res) => {
    console.log(`[Hello service] New request at ${new Date().toISOString()}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello service. Port: ${port}. Your date: ${new Date()}`);
});

server.listen(port, () => {
    console.log(`Auth service running at ${port} port.`);
});
