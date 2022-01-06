var express = require('express');
var router = express.Router();
const PatientController = require('../controller/patient'); 

// route list
router.post('/createupdate',PatientController.add_Corna_Status);
router.get('/report',PatientController.corna_Analysis_Status);
router.get('/reportDistrict',PatientController.corna_Analysis_Status_Districts);
router.post('/createlog',PatientController.update_log);



router.get('/report/:district/:date',PatientController.corna_Analysis_Status_Districts_Report);

router.get('/lastUpdated',PatientController.lastUpdated);


module.exports = router;
 