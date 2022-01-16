const Minio = require('minio')
const fs = require('fs');

var minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});

minioClient.listBuckets(function (err, buckets) {
    if (err) return console.log(err)
    console.log('buckets :', buckets)
})


function uploadFile(filename, file, callback) {

    let fileStream = fs.createReadStream(file)
    fs.stat(file, (err, stats) => {
        if (err) {
            return console.log(err)
        }
        minioClient.putObject('videobucket', filename, fileStream, stats.size, function (err, objInfo) {
            if (err) {
                return console.log(err) // err should be null
                callback(err, null)
            }
            callback(null, objInfo)
        })
    })

}

function existsFile(filename, callback) {
    minioClient.statObject('videobucket', filename, function (err, stat) {
        if (err) {
            callback(false)
        }
        callback(true)
    })
}

function getFile(filename, callback) {
    var size = 0
    minioClient.getObject('videobucket', filename, function (err, dataStream) {
        if (err) {
            return console.log(err)
        }
        dataStream.on('data', function (chunk) {
            size += chunk.length
        })
        dataStream.on('end', function () {
            console.log('End. Total size = ' + size)
        })
        dataStream.on('error', function (err) {
            console.log(err)
        })
    })
}

var data = []
var stream = minioClient.listObjects('videobucket', '', true)
stream.on('data', function (obj) {
    data.push(obj)
})
stream.on("end", function (obj) {
    console.log(data)
})
stream.on('error', function (err) {
    console.log(err)
})

module.exports = {
    uploadFile,
    existsFile
};