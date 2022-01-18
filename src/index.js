const app = require('express')();
const storageService = require('./storage/minio');
const hls_server = require('./hls/hls-server');

app.get('/', (req,res) => {
    return res.status(200).sendFile(`${__dirname}/view/index.html`);
});

app.get('/videobucket',(req,res) => {
    storageService.listFilesByBucket('videobucket')
        .then((data) => {
            res.json(data);
        }) 
        .catch((e) => {
            console.log(e);
        });
})

const server = app.listen(8000);

hls_server.run(server);