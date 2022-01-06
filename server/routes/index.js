var express = require('express');
var router = express.Router();
const IndexController = require('../controller/index');

// route list
router.get('/visitor', IndexController.visitors_get_all);
router.get('/suspected', IndexController.visitors_suspected_visitors);
router.get('/citizenscreened', IndexController.visitors_suspected_visitors_count);

// router.get('/totalvisiter' ,);
router.get('/totalvisiter',IndexController.webtotal_visiter);

router.get('/totalvisiter/adm',IndexController.webtotal_visiter_admin);


module.exports = router;
