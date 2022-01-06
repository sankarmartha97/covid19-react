const express = require('express');
const router = express.Router();
const userMangement = require('../controller/usermanagement');

router.put('/changePassword',userMangement.changePassword);




module.exports = router