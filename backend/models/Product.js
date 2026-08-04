const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  category: { type: String, required: true, index: true },
  brand: { type: String },
  stock: { type: Number, default: 0 },
  images: [String],
  ratings: { avg: { type: Number, default: 0 }, count: { type: Number, default: 0 } }
}, { timestamps: true });

productSchema.virtual('discountedPrice').get(function () {
  return +(this.price * (1 - this.discountPercent / 100)).toFixed(2);
});

module.exports = mongoose.model('Product', productSchema);
