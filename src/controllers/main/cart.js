import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { verifySession } from '../../utils';

export async function getCart(req, res) {
  try {
    const token = req.headers['access-token'];
    const user = await verifySession(token);
    const snapshot = await firebase.firestore().collection('cart').doc(user).get();
    if (snapshot.exists) {
      const products = snapshot.data().products;
      return res.json({
        status: true,
        products
      });
    } else {
      return res.json({
        status: true,
        products: []
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: error.message
    });
  }
}

export async function addProductToCart(req, res) {
  try {
    const token = req.headers['access-token'];
    const { idProduct } = req.body;

    // Verify session
    const user = await verifySession(token);

    // Validate body
    if (typeof idProduct === 'string' && idProduct.length > 0) {

      // Verify if idProduct exist
      const item = await firebase.firestore().collection('products').doc(idProduct).get();
      if (item.exists) {
        let snapshot = await firebase.firestore().collection('cart').doc(user).get();
        let products = snapshot.data().products;
        const itemInCart = products.find(el => el.id === idProduct);
        if (!itemInCart) {
          products.push(item.data());
  
          await firebase.firestore().collection('cart').doc(user).update({ products });
  
          snapshot = await firebase.firestore().collection('cart').doc(user).get();
  
          return res.json({
            status: true,
            products: snapshot.data().products,
            message: `El producto fue agregado al carrito correctamente.`
          });
        } else {
          return res.status(401).json({
            status: false,
            message: 'El producto ya se encuentra en el carrito'
          });
        }
      } else {
        return res.status(401).json({
          status: false,
          message: 'El id del producto no existe'
        });
      }
    } else {
      return res.status(401).json({
        status: false,
        message: idProduct ? 'Tipo de dato para producto no permitido.' : 'No se envío el producto'
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: error.message
    });
  }
}

export async function deleteProductCart(req, res) {
  try {
    const token = req.headers['access-token'];
    const { idProduct } = req.body;

    // Verify session
    const user = await verifySession(token);

    // Validate body
    if (typeof idProduct === 'string' && idProduct.length > 0) {
      // Remove product

      let snapshot = await firebase.firestore().collection('cart').doc(user).get();
      let productsSnap = snapshot.data().products;
      let itemInCart = productsSnap.find(el => el.id === idProduct);
      
      if(itemInCart) {
        itemInCart = productsSnap.filter(el => el.id !== idProduct);
        await firebase.firestore().collection('cart').doc(user).update({ products: itemInCart });
        snapshot = await firebase.firestore().collection('cart').doc(user).get();
        const products = snapshot.data().products;
        return res.json({
          status: true,
          products,
          message: 'El producto fue eliminado correctamente.',
        });
      } else {
        return res.status(401).json({
          status: false,
          message: 'El producto no se encuentra en el carrito.'
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