import test from 'ava';
import request from 'supertest';
import app from '../index';

/**
 * Adding a product
 */

test('POST /products -> Whitout access-token', async t => {
  t.plan(3);
  const res = await request(app)
    .post(`/products`);
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Falta enviar el token de la sesión');
});

test('POST /products -> Sending EMPTY parameters', async t => {
  t.plan(3);
  const user = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty1234' });
  const res = await request(app)
    .post(`/products`)
    .set({ 'access-token': user.body.user.accessToken });
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'No se envío el producto');
});

test('POST /products -> OK Adding one product', async t => {
  t.plan(3);
  const user = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty1234' });
  const product = `test${Math.floor(Math.random() * 10)}`;
  const resAdd = await request(app)
    .post(`/products`)
    .send({ product })
    .set({ 'access-token': user.body.user.accessToken });
  // Removing test
  const id = resAdd.body.products.find(el => el.name === product);
  await request(app)
    .delete('/products')
    .send({ idProduct: id.id })
    .set({ 'access-token': user.body.user.accessToken });
  t.is(resAdd.status, 200);
  t.is(resAdd.body.status, true);
  t.pass(resAdd.body.products);
});

/**
 * Getting all products
 */

test('GET /products -> Whitout access-token', async t => {
  t.plan(3);
  const res = await request(app)
    .get(`/products`);
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Falta enviar el token de la sesión');
});

test('GET /products -> OK Getting all products', async t => {
  t.plan(3);
  const user = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty1234' });
  const res = await request(app)
    .get(`/products`)
    .set({ 'access-token': user.body.user.accessToken });
  t.is(res.status, 200);
  t.is(res.body.status, true);
  t.pass(res.body.products);
});

/**
 * Removing a product
 */

test('DELETE /products -> Whitout access-token', async t => {
  t.plan(3);
  const res = await request(app)
    .delete(`/products`);
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Falta enviar el token de la sesión');
});

test('DELETE /products -> Sending EMPTY parameters', async t => {
  t.plan(3);
  const user = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty1234' });
  const res = await request(app)
    .delete(`/products`)
    .set({ 'access-token': user.body.user.accessToken });
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'No se envío el id del producto');
});

test('DELETE /products -> OK Adding one product', async t => {
  t.plan(3);
  const user = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty1234' });
  const product = `test${Math.floor(Math.random() * 10)}`;
  const resAdd = await request(app)
    .post(`/products`)
    .send({ product })
    .set({ 'access-token': user.body.user.accessToken });

  const id = resAdd.body.products.find(el => el.name === product);
  const res = await request(app)
    .delete('/products')
    .send({ idProduct: id.id })
    .set({ 'access-token': user.body.user.accessToken });

  t.is(res.status, 200);
  t.is(res.body.status, true);
  t.pass(res.body.products);
});