const router = require('express').Router();
const rescue = require('express-rescue');
const validateJoi = require('../middlewares/validateJoi');
const validateJWT = require('../auth/validateJWT');
const { validatePost } = require('../schemas/JoiSchemas');
const { create, getAll } = require('../controllers/blogPost');

router.use(validateJWT);

router.get('/', rescue(getAll));

router.post('/', validateJoi(validatePost), rescue(create));

module.exports = router;