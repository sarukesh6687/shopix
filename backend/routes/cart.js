const router = require('express').Router();
const { getCart, addItem, updateItem, removeItem, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/', getCart);
router.post('/add', addItem);
router.put('/item/:itemId', updateItem);
router.delete('/item/:itemId', removeItem);
router.delete('/clear', clearCart);

module.exports = router;
