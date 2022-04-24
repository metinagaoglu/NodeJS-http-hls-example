const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const filter = require('content-filter')

// db connection
const db = require('./database/connection')();

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

/**
 *  Middleware
 */
const verifyToken = require('./middleware/verify-token');

/**
 * Routers
 */
const authRouter = require('./routes/authRoute');
const indexRouter = require('./routes/indexRoute');
const videoRouter = require('./routes/videoRoute');

/**
 * By this default using, content-filter checks the request URL for { and $ characters and functions and objects of the html body data property names for $ character coming by GET, POST, PUT and DELETE methods.
 */
const blackList = ['$', '{', '&&', '||']
const options = {
    dispatchToErrorHandler: true,
    urlBlackList: blackList,
    bodyBlackList: blackList
}

app.use(filter(options));
app.use('/api',verifyToken);

app.use('/api/videos',videoRouter);
app.use('/',indexRouter);
app.use('/auth',authRouter);

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(500);
    res.json({ status: false , error: err.message });
});



module.exports = app