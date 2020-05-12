import test from 'ava';
import request from 'supertest';
import app from '../index';

test('POST /auth/login -> Sending EMPTY parameters', async t => {
  t.plan(3);
  const res = await request(app)
    .post(`/auth/login`)
    .send({ email: 'ava@rocks.com' });
  t.is(res.status, 400);
  t.is(res.body.status, false);
  t.is(res.body.message, 'No se enviaron los parametros completos');
});

test('POST /auth/login -> Account INVALID', async t => {
  t.plan(3);
  const res = await request(app)
    .post(`/auth/login`)
    .send({ email: 'test-@ava.com', password: 'qwerty1234' });
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Esta cuenta ha sido deshabilitada.');
});

test('POST /auth/login -> User NOT FOUND', async t => {
  t.plan(3);
  const res = await request(app)
    .post(`/auth/login`)
    .send({ email: '-test-@ava.com', password: 'qwerty1234' });
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Usuario no encontrado.');
});

test('POST /auth/login -> INVALID password', async t => {
  t.plan(3);
  const res = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty12345' });
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Contraseña incorrecta.');
});

test('POST /auth/login -> User not found', async t => {
  t.plan(3);
  const res = await request(app)
    .post(`/auth/login`)
    .send({ email: 'ava@test.com', password: 'qwerty12345' });
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Usuario no encontrado.');
});

test('POST /auth/login -> OK login with email', async t => {
  t.plan(4);
  const res = await request(app)
    .post(`/auth/login`)
    .send({ email: 'iam@diegomoreno.co', password: 'qwerty1234' });
  t.is(res.status, 200);
  t.is(res.body.status, true);
  t.is(res.body.message, '¡Login exitoso!');
  t.pass(res.body.user);
});
