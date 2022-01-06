var express = require('express');
var router = express.Router();
const UsersController = require('../controller/users');


// route list
router.get('/', UsersController.users_mobile_get_all);
router.get('/approved', UsersController.user_mobile_aproved_get_all); 
router.post('/login', UsersController.login);
router.post('/singup', UsersController.singup);
router.put('/:id', UsersController.user_verify_status);
router.put('/delete/:id', UsersController.user_delete);



module.exports = router;

