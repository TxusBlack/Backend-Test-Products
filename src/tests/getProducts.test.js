import test from 'ava';
import request from 'supertest';
import app from '../index';

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