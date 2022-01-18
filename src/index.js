const app = require('express')();

const hls_server = require('./hls/hls-server');

app.get('/', (req,res) => {
    return res.status(200).sendFile(`${__dirname}/view/index.html`);
});

const server = app.listen(8000);

hls_server.run(server);