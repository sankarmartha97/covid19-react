var express = require('express');
// const http = require('http');
// var createError = require('http-errors');
const bodyparser = require('body-parser');
const path = require("path");
var logger = require('morgan');
const app = express();

// route list
const mapRouter = require('./routes/map');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const analysisRouter = require('./routes/graph');
const patientRouter = require('./routes/patient');
const adminRouter = require('./routes/admin');
const deshbord = require('./routes/deshbord');
const userMangment = require('./routes/usermanagement');
const superAdmin = require('./routes/superadmin');


// app middle-ware
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use('/govt-orders',express.static(path.join(__dirname,'uploads')));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/', mapRouter);
app.use('/users', usersRouter);
app.use('/status', patientRouter);
app.use('/visitors', indexRouter);
app.use('/analysis', analysisRouter);
app.use('/admin', adminRouter);
app.use('/deshbord',deshbord);
app.use('/', userMangment);
app.use('/', superAdmin);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


// server 
app.listen('4000', () => {
    console.log('server running at 4000');
});