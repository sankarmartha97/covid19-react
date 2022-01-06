var express = require('express');
var router = express.Router();
const GrapController = require('../controller/graph');

// route list
router.get('/total', GrapController.total_vs_suspected_data);
router.get('/checkpoint', GrapController.suspected_vs_chechpoint);



module.exports = router;