import {
  registerEmail
} from './controllers';

export default (app) => {
  app.get('/', (req, res) => {
    res.send('hello world');
  });

  // Register
  app.post('/auth/register', registerEmail);
  
}
