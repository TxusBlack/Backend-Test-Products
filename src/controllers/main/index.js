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
      status: true,
      products
    });
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: error.message
    });
  }
}

export async function addProduct(req, res) {
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
        status: true,
        products,
        message: `El producto ${product} fue agregado correctamente.`
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

export async function deleteProduct(req, res, next) {
  try {
    const token = req.headers['access-token'];
    const { idProduct } = req.body;

    // Verify session
    await verifySession(token);

    // Validate body
    if (typeof idProduct === 'string' && idProduct.length > 0) {
      // Remove product
      const item = await firebase.firestore().collection('products').doc(idProduct).get();
      if (item.exists) {
        await firebase.firestore().collection('products').doc(idProduct).delete();
        // Get All Products
        const snapshot = await firebase.firestore().collection('products').get();
        const products = snapshot.docs.map(doc => doc.data());
        return res.json({
          status: true,
          products,
          message: 'El producto fue eliminado correctamente.',
        });
      } else {
        return res.status(401).json({
          status: false,
          message: 'El id del producto no existe'
        });
      }
    } else {
      return res.status(401).json({
        status: false,
        message: idProduct ? 'Tipo de dato para id producto no permitido.' : 'No se envío el id del producto'
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: error.message
    });
  }
}
