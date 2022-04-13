const router = require('express').Router();
const rescue = require('express-rescue');
const validateJoi = require('../middlewares/validateJoi');
const { validateLogin } = require('../schemas/JoiSchemas');
const { login } = require('../controllers/login');

router.post('/', validateJoi(validateLogin), rescue(login));

module.exports = router;