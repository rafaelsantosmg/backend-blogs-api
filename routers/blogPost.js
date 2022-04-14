const router = require('express').Router();
const rescue = require('express-rescue');
const validateJoi = require('../middlewares/validateJoi');
const validateJWT = require('../auth/validateJWT');
const { validatePost, validateUpdatePost } = require('../schemas/JoiSchemas');
const { create, getAll, getById, update } = require('../controllers/blogPost');

router.use(validateJWT);

router.get('/', rescue(getAll));
router.get('/:id', rescue(getById));

router.post('/', validateJoi(validatePost), rescue(create));

router.put('/:id', validateJoi(validateUpdatePost), rescue(update));

module.exports = router;