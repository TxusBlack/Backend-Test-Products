import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { verifySession } from '../../middlewares';

export async function getProducts(req, res, next) {
  try {
    const token = req.headers['access-token'];
    const uid = await verifySession(token);
    const snapshot = await firebase.firestore().collection('products').get();
    const products = snapshot.docs.map(doc => doc.data());
    res.json({
      test: true,
      uid,
      products
    });
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: error
    });
  }
}
