var express = require('express');
var router = express.Router();
const authorize = require("../middleware/authorization");
const SuperAdminController = require('../controller/superAdmin'); 

router.get('/recentapproved', authorize, SuperAdminController.recentapproved);
router.put('/recheckReport', authorize, SuperAdminController.recheckReport);


module.exports = router;
