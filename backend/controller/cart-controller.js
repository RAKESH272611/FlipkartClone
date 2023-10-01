import User from "../models/user-schema.js";
import Product from '../models/product-schema.js';

export const removeOneItem = async (req, res) => {
    try {
      const username = req.user.username; 
      const productIdToRemove = req.params.id; // Get the item ID from the URL parameter
      await User.updateOne(
        { username: username }, // Find the user by username
        { $pull: { cart: { id: productIdToRemove } } } // Remove the product by its "id"
      );
      
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const addOneItem = async (req, res) => {
    try {
      const username = req.user.username; 
      const product = req.body; // Get the item ID from the URL parameter
      const necessaryProperties = {
        id: product.id,
        url: product.url,
        detailUrl: product.detailUrl,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        discount: product.discount,
        tagline: product.tagline,
      };
      
      await User.updateOne(
        { username: username },
        { $push: { cart: necessaryProperties } }
      );
      
      
      res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const removeAllItem = async (req, res) => {
    try {
      const username = req.user.username; 
      await User.updateOne(
        { username: username }, // Find the user by username
        { $set: { cart: [] } } // Set the cart to an empty array
      );
      
     
      
      res.status(200).json({ message: 'All items removed from cart successfully' });
    } catch (error) {
      console.error('Error removing all items from cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };