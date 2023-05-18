var express = require('express');
var router = express.Router();
var accountsController=require('../controllers/accounts')

router.get('/', accountsController.getAccounts);
router.get('/:id', accountsController.getAccounts);

router.post('/', accountsController.createAccount);
router.delete('/:id', accountsController.deleteAccount );
router.put("/:id" , accountsController.updateAccount);

router.post('/login',accountsController.forLogin);
router.post('/signup',accountsController.forSignup);

module.exports = router;
