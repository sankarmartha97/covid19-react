var express = require('express');
var router = express.Router();
const MapController = require('../controller/map');


// route list
router.get('/Check_gates', MapController.check_point_get_all);
router.get('/isolation', MapController.isolation_get_all);
router.get('/quarantine', MapController.quarantine_get_all);
router.get('/districts_boundary', MapController.districts_boundary);

router.get('/v2/districts_boundary', MapController.districts_boundary_new);

// router.get('/v2/districts_boundary', MapController.districts_boundary_new_error);

router.get('/districtlist', MapController.district_list);


module.exports = router;
