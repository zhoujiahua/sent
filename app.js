const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('ok')
})

app.get('/stream', (req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
    });
    
    res.write(`retry: 10000\n`);
    res.write(`event: connecttime\n`);
    res.write(`data:${Date()}\n\n`);

    let timer = setInterval(() => {
        let result = { name: 'jerry', age: '18', time: Date.now() };
        res.write(`data:${JSON.stringify(result)}\n\n`);
    }, 1000)

    req.connection.addListener('close', () => {
        clearInterval(timer);
    }, false);
})

// Start server
const port = process.env.PORT || 5000;
app.listen(port, async () => {
    console.log(`Start runing server:http://localhost:${port}`);
});