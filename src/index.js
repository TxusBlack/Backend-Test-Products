import express from 'express';
import * as bodyParser from 'body-parser';
import 'babel-polyfill';

const admin = require('firebase-admin');
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig, serviceAccount, config } from './config';

firebase.initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL
});

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

app.listen(process.env.PORT || config.portDefault, '0.0.0.0', () => {
  console.log(`Escuchando desde el puerto ${process.env.PORT || config.portDefault}!`);
});

export default app;
