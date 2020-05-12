import test from 'ava';
import request from 'supertest';
import app from '../index';

test('POST /auth/register -> Sending EMPTY parameters', async t => {
  t.plan(3);
  const res = await request(app)
    .post(`/auth/register`)
    .send({ email: 'ava@rocks.com' });
  t.is(res.status, 400);
  t.is(res.body.status, false);
  t.is(res.body.message, 'No se enviaron los parametros completos');
});

test('POST /auth/register -> Password less than 8 characteres', async t => {
  t.plan(3);
  const res = await request(app)
    .post(`/auth/register`)
    .send({
      email: 'ava@rocks.com',
      password: '1234',
    });
  t.is(res.status, 400);
  t.is(res.body.status, false);
  t.is(res.body.message, 'La contraseña debe tener al menos 8 caracteres');
});

test('POST /auth/register -> The email is taken', async t => {
  t.plan(3);
  const res = await request(app)
    .post(`/auth/register`)
    .send({
      email: 'iam@diegomoreno.co',
      password: '1234567890'
    });
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Correo ya registrado.');
});

test('POST /auth/register -> The Email is invalid', async t => {
  t.plan(3);
  const res = await request(app)
    .post(`/auth/register`)
    .send({
      email: 'test@ava',
      password: '1234567890'
    });
  t.is(res.status, 401);
  t.is(res.body.status, false);
  t.is(res.body.message, 'Correo no válido.');
});

test('POST /auth/register -> OK creating a new User', async t => {
  t.plan(4);
  const newUsername = `test${Math.floor(Math.random() * 10)}`;
  const res = await request(app)
    .post(`/auth/register`)
    .send({
      email: `${newUsername}@ava.com`,
      password: '1234567890',
    });
  t.is(res.status, 200);
  t.is(res.body.status, true);
  t.is(res.body.message, '¡Usuario creado exitosamente!');
  t.pass(res.body.user);
});
