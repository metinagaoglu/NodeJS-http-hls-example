const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const storageService = require('./storage/minio');
const hls_server = require('./hls/hls-server');
const db = require('./database/connection')();
const Video = require('./models/Video');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

/**
 * Routers
 */
const authRouter = require('./routes/auth');

app.use('/auth',authRouter);

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

app.get('/videos',(req,res) => {
    const promise = Video.find({});
    promise.then((data) => {
        res.json(data)
    }).catch((e) => {
        console.log(e)
    })
})

const server = app.listen(8080);

hls_server.run(server);

module.exports = server