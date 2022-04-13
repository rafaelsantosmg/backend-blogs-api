const router = require('express').Router();
const rescue = require('express-rescue');
const validateJoi = require('../middlewares/validateJoi');
const validateJWT = require('../auth/validateJWT');
const { validateCategory } = require('../schemas/JoiSchemas');
const { create, getAll } = require('../controllers/category');

router.use(validateJWT);

router.get('/', rescue(getAll));

router.post('/', validateJoi(validateCategory), rescue(create));

module.exports = router;