const router = require('express').Router();
const { getStats, getAllOrders, updateOrderStatus, getUsers, deleteUser } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.use(protect, adminOnly);
router.get('/stats', getStats);
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;
