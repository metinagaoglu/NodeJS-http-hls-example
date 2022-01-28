
# Video streaming example with NodeJS / HLS


This project includes an example that streams a simple video to the client using http hls.

HTTP Live Streaming(HLS) is HTTP-based streaming protocol.


HLS uses .m3u8 and .ts files.

    .m3u8: A file that has information list of segmented videos
    .ts: A file for each segmented video

Advantages of HLS

    Because HLS based on HTTP, You can save more cost than other way.
    You can utilize advantages of HTTP like caching.


## Technologies

**Client:** Pure javascript

**Server:** NodeJS, Express, FFmpeg

**Database:** MongoDB

**Storage:**  MinIO

**NPM Packages** 
- @ffmpeg-installer/ffmpeg
- fluent-ffmpeg
- Express
- hls-server


## Articles & Resources

[Fluent ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg) Fluent ffmpeg-API for node.js Build Status

[hls-server](https://www.npmjs.com/package/hls-server) Simple HTTP middleware for serving HTTP Live Streaming (HLS) compatible media streams.

[express](https://www.npmjs.com/package/express) Fast, unopinionated, minimalist web framework for node.

[HTTP Live Streaming](https://developer.apple.com/documentation/http_live_streaming) HTTP Live Streaming


### MongoDB

[Multiple-Collections-Versus-Embedded-Documents](https://www.openmymind.net/Multiple-Collections-Versus-Embedded-Documents/#1)

[MongoDB populates](https://mongoosejs.com/docs/populate.html)

[MongoDB best practices](https://www.mongodb.com/basics/best-practices)

## Screenshots

![App Screenshot](https://github.com/metinagaoglu/NodeJS-http-hls-example/blob/main/images/Screenshot-video-example.png?raw=true)