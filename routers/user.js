const router = require('express').Router();
const rescue = require('express-rescue');
const validateJoi = require('../middlewares/validateJoi');
const validateJWT = require('../auth/validateJWT');
const { validateUser } = require('../schemas/JoiSchemas');
const { create, getAll } = require('../controllers/user');

router.get('/', validateJWT, rescue(getAll));
router.post('/', validateJoi(validateUser), rescue(create));

module.exports = router;