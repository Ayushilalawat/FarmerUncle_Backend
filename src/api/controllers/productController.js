const ProductModel = require('../models/productModel');
const fs = require('fs');
const path = require('path');

// Controller to create a new product
exports.create = async (req, res) => {
    try {
      const {
        productName,
        price,
        category,
        tag,
        weight,
        description,
        dimension,
        inStock,
      } = req.body;
  
      const image = req.file.filename; 
  
      const newProduct = new ProductModel({
        image,
        productName,
        price,
        category,
        tag,
        weight,
        description,
        dimension,
        inStock,
      });
  
      const savedProduct = await newProduct.save();
  
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).send('Internal Server Error');
    }
  };

// Controller to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Controller to get a single product by ID
exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Controller to update a product by ID
exports.updateProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Controller to delete a product by ID
// exports.deleteProductById = async (req, res) => {
//   const productId = req.params.id;

//   try {
//     const deletedProduct = await ProductModel.findByIdAndDelete(productId);

//     if (!deletedProduct) {
//       return res.status(404).send('Product not found');
//     }

//     res.status(200).json(deletedProduct);
//   } catch (error) {
//     console.error('Error deleting product by ID:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };


exports.delete = async (req, res) => {
  try {
    const productId = req.params.id;

    // Retrieve the product details to get the image filename
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Remove the product from the database
    await ProductModel.findOneAndDelete({ _id: productId });

    // Delete the associated image file
    if (product.image) {
      const imagePath = path.join(__dirname, './public/images/product/', product.image);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
        } else {
          console.log('Image deleted successfully');
        }
      });
    }

    res.status(200).send('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Internal Server Error');
  }
};
