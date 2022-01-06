const express = require('express');
const router = express.Router();
const AdminController = require('../controller/admin');
const authorize = require("../middleware/authorization");

router.get('/reqSet', AdminController.WaitingForApproval );

router.post('/verify', authorize, AdminController.verify );

// router.get('/verify', AdminController.verify );



router.put('/verify', authorize, AdminController.verify_old );

router.post('/citizen_data', authorize, AdminController.citienData);

router.post('/citizen_data_new', authorize, AdminController.citienDataNew);

router.get('/citizen_current', authorize, AdminController.currentCitienStatus);

router.get('/approvedReports', authorize, AdminController.approvedReports);

router.get('/districtReportsview', authorize, AdminController.districtReportsview);

router.post('/pdf', AdminController.order);

router.get('/insert', AdminController.insertCitienData);

router.get('/report', AdminController.report);

module.exports = router;
