import express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// File to manage routes
require('./routes').default(app);

app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
  console.log('Escuchando desde el puerto 3000!');
});

module.exports = app;
