//image,product name ,price ,category,tag,weight,description ,dimenssion,instock
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tag: { type: String,required: true },
  weight: { type: String,required: true },
  description: { type: String ,required: true},
  dimension: {
    length: { type: Number,required: true },
    width: { type: Number ,required: true},
    height: { type: Number,required: true }
  },
  inStock: { type: Number ,required: true}
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
