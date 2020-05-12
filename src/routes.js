import {
  registerEmail,
  loginEmail,
  getProducts,
  addProduct,
  deleteProduct,
  getCart,
  addProductToCart,
  deleteProductCart
} from './controllers';

export default (app) => {
  // Register
  app.post('/auth/register', registerEmail);
  app.post('/auth/login', loginEmail);

  // Products
  app.get('/products', getProducts);
  app.post('/products', addProduct);
  app.delete('/products', deleteProduct);

  // Cart
  app.get('/cart', getCart);
  app.post('/cart', addProductToCart);
  app.delete('/cart', deleteProductCart);
}
