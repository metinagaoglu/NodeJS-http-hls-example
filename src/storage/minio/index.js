const Minio = require('minio')
const fs = require('fs');

var minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});

function listBucket() {
    minioClient.listBuckets((err, buckets) => {
        if (err) return console.log(err)
        console.log('buckets :', buckets)
    })
}

function uploadFile(filename, file) {

    return new Promise((resolve, reject) => {
        let fileStream = fs.createReadStream(file)

        fs.stat(file, (err, stats) => {
            if (err) {
                reject(err.code);
            }
            minioClient.putObject('videobucket', filename, fileStream, stats.size, (err, objInfo) => {
                if (err) {
                    reject(err.code);
                }
                resolve(objInfo);
            })
        })
    });

}

function existsFile(filename) {

    return new Promise((resolve, reject) => {
        minioClient.statObject('videobucket', filename, (err, stat) => {
            if (err) {
                reject(err.code);
            }
            resolve(stat);
        })
    });

}

function getFile(filename) {

    return new Promise((resolve, reject) => {
        minioClient.getObject('videobucket', filename, (err, dataStream) => {
            if (err) {
                reject(err)
            }
            resolve(dataStream)
        })
    });

}

function listFilesByBucket(bucket) {

    return new Promise((resolve, reject) => {
        var data = []
        var stream = minioClient.listObjects(bucket, '', true)
        stream.on('data', function (obj) {
            data.push(obj)
        })
        stream.on("end", function (obj) {
            resolve(data);
        })
        stream.on('error', function (err) {
            reject(err);
        })
    });

}


module.exports = {
    uploadFile,
    existsFile,
    getFile,
    listFilesByBucket
};