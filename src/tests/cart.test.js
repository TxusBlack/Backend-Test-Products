import test from 'ava';
import request from 'supertest';
import app from '../index';

/**
 * Getting the cart
 */
test('GET /cart -> Whitout access-token', async t => {
  t.plan(3);
  const res = await request(app)
    .get(`/cart`);
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Falta enviar el token de la sesión');
});

test('GET /cart -> OK Getting all products of the cart', async t => {
  t.plan(3);
  const user = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty1234' });
  const res = await request(app)
    .get(`/cart`)
    .send({ idProduct: 'q5kS0LveFjB3fIUoeW7Z' })
    .set({ 'access-token': user.body.user.accessToken });
  
  t.is(res.status, 200);
  t.is(res.body.status, true);
  t.pass(res.body.products);
});

/**
 * Adding an element to cart
 */

test('POST /cart -> Whitout access-token', async t => {
  t.plan(3);
  const res = await request(app)
    .post(`/cart`);
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Falta enviar el token de la sesión');
});

test('POST /cart -> Sending EMPTY parameters', async t => {
  t.plan(3);
  const user = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty1234' });
  const res = await request(app)
    .post(`/cart`)
    .set({ 'access-token': user.body.user.accessToken });
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'No se envío el producto');
});

test('POST /cart -> The product is already in the cart', async t => {
  t.plan(3);
  const user = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty1234' });
  const resAdd = await request(app)
    .post(`/cart`)
    .send({ idProduct: 'Cb3o9bX2rbMh7qF3Wj4C' })
    .set({ 'access-token': user.body.user.accessToken });
  // Removing test
  t.is(resAdd.status, 401);
  t.is(resAdd.body.status, false);
  t.is(resAdd.body.message, 'El producto ya se encuentra en el carrito');
});

test('POST /cart -> OK Adding and removing one product to cart', async t => {
  t.plan(3);
  const user = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty1234' });
  const resAdd = await request(app)
    .post(`/cart`)
    .send({ idProduct: 'rXJrg6WyDYcXSo1tD13w' })
    .set({ 'access-token': user.body.user.accessToken });
  // Removing test
  const id = resAdd.body.products.find(el => el.id === 'rXJrg6WyDYcXSo1tD13w');
  await request(app)
    .delete('/cart')
    .send({ idProduct: 'rXJrg6WyDYcXSo1tD13w' })
    .set({ 'access-token': user.body.user.accessToken });
  t.is(resAdd.status, 200);
  t.is(resAdd.body.status, true);
  t.pass(resAdd.body.products);
});

/**
 * Delete an element
 */

test('DELETE /cart -> Whitout access-token', async t => {
  t.plan(3);
  const res = await request(app)
    .delete(`/cart`);
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Falta enviar el token de la sesión');
});

test('DELETE /cart -> The product no exist', async t => {
  t.plan(3);
  const user = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty1234' });
  const res = await request(app)
    .delete(`/cart`)
    .send({ idProduct: 'rXJrg6WyDYcXSo1tD13w' })
    .set({ 'access-token': user.body.user.accessToken });
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'El producto no se encuentra en el carrito.');
});
