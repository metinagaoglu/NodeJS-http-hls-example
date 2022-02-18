const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// db connection
const db = require('./database/connection')();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

/**
 * Routers
 */
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

app.use('/',indexRouter);
app.use('/auth',authRouter);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 201);
    res.json({ error: err.message });
    
});



module.exports = app