const router = require('express').Router();
const { getAll, getOne, getCategories, create, update, remove } = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getAll);
router.get('/categories', getCategories);
router.get('/:id', getOne);
router.post('/', protect, adminOnly, create);
router.put('/:id', protect, adminOnly, update);
router.delete('/:id', protect, adminOnly, remove);

module.exports = router;
