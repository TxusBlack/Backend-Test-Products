import {
  registerEmail,
  getProducts,
  addProduct
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
  
}
