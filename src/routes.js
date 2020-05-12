import {
  registerEmail,
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

  // Products
  app.get('/products', getProducts);
  app.post('/add-product', addProduct);
  app.delete('/delete-product', deleteProduct);
  
}
