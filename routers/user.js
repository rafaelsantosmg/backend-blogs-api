const router = require('express').Router();
const rescue = require('express-rescue');
const validateJoi = require('../middlewares/validateJoi');
const { validateUser } = require('../schemas/JoiSchemas');
const { create } = require('../controllers/user');

router.post('/', validateJoi(validateUser), rescue(create));

module.exports = router;