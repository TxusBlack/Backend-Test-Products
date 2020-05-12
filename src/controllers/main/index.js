import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { verifySession } from '../../middlewares';

export async function getProducts(req, res) {
  try {
    const token = req.headers['access-token'];
    await verifySession(token);
    const snapshot = await firebase.firestore().collection('products').get();
    const products = snapshot.docs.map(doc => doc.data());
    return res.json({
      test: true,
      products
    });
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: error.message
    });
  }
}

export async function addProduct(req, res, next) {
  try {
    const token = req.headers['access-token'];
    const { product } = req.body;

    // Verify session
    await verifySession(token);

    // Validate body
    if (typeof product === 'string' && product.length > 0) {
      // Save product
      const newProduct = await firebase.firestore().collection('products').add({name: product});
      // Add ID to object
      await firebase.firestore().collection('products').doc(newProduct.id).update({ id: newProduct.id, name: product });
      // Get All Products
      const snapshot = await firebase.firestore().collection('products').get();
      const products = snapshot.docs.map(doc => doc.data());
      return res.json({
        test: true,
        products
      });
    } else {
      return res.status(401).json({
        status: false,
        message: product ? 'Tipo de dato para producto no permitido.' : 'No se envío el producto'
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: error.message
    });
  }
}
