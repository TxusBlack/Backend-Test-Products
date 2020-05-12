import {
  registerEmail,
  loginEmail,
  getProducts,
  addProduct,
  deleteProduct
} from './controllers';

export default (app) => {
  // Register
  app.post('/auth/register', registerEmail);
  app.post('/auth/login', loginEmail);

  // Products
  app.get('/products', getProducts);
  app.post('/products', addProduct);
  app.delete('/products', deleteProduct);
}
