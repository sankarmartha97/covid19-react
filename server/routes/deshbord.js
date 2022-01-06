const express = require('express');
const router = express.Router();
const controler = require('../controller/deshbord');

router.get('/timeserie', controler.timeserie);

router.get('/cumilate',controler.cumilate);

router.get('/daily', controler.daily);

router.get('/beds', controler.cumulativeBeds);
router.get('/v2/beds', controler.bedsAvailability);

router.get('/vacci', controler.vaccination);
router.get('/cumulative', controler.cumulative);
router.get('/cumlative/vaccination', controler.cumlativevaccination);
router.get('/citizens', controler.citizens);

router.get('/ardcrtpvrate', controler.districtPositivityRate);

router.get('/arpvrate', controler.statetPositivityRate);

router.get('/vaccinationNew', controler.vaccinationChartNew);

router.get('/inappropriatebehaviour', controler.inappropriateBehaviour);





module.exports = router;