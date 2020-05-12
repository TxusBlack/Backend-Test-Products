import {
  registerEmail,
  loginEmail,
  getProducts,
  addProduct,
  deleteProduct
} from './controllers';

export default (app) => {
  app.get('/', (req, res) => {
    res.send('hello world');
  });

  // Register
  app.post('/auth/register', registerEmail);
  app.post('/auth/login', loginEmail);

  // Products
  app.get('/products', getProducts);
  app.post('/add-product', addProduct);
  app.delete('/delete-product', deleteProduct);
  
}
