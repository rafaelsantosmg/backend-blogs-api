const router = require('express').Router();
const rescue = require('express-rescue');
const validateJoi = require('../middlewares/validateJoi');
const validateJWT = require('../auth/validateJWT');
const { validateUser } = require('../schemas/JoiSchemas');
const { create, getAll, getById, destroy } = require('../controllers/user');

router.post('/', validateJoi(validateUser), rescue(create));

router.use(validateJWT);
router.get('/', rescue(getAll));
router.get('/:id', rescue(getById));

router.delete('/me', rescue(destroy));

module.exports = router;