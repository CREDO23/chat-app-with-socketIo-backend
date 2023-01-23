import * as supertest from 'supertest';
import { app } from '../src/index';

jest.setTimeout(60000);

describe('chats', () => {
  describe('Get chats endpoint', () => {
    describe('Get chat by userid', () => {
      test('Should return a 400 status code and an "Invalid ID" error message if the id is not an Object ID (mongoose)', async () => {
        const response = await supertest(app).get('/api/chats/iyvcvuvu');

        expect(response.statusCode).toBe(400);

        expect(response.body).toMatchObject({
          message: 'Invalid ID',
          data: null,
          success: false,
        });
      });

      test('Should return a 404 status code and an "Chat not Found" error message if the chat do not exist', async () => {
        const response = await supertest(app).get(
          '/api/chats/63738684332ad562cd9376ea',
        );

        expect(response.statusCode).toBe(404);

        expect(response.body).toMatchObject({
          message: 'Chat not found',
          data: null,
          success: false,
        });
      });

      test('Should return a 200 status code and an "Chat Found" error message if the chat do not exist', async () => {
        const response = await supertest(app).get(
          '/api/chats/63720086972582efefe60495',
        );

        expect(response.statusCode).toBe(200);

        expect(response.body.data.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('users', () => {
  describe('Get users endpoint', () => {
    describe('Get user by id', () => {
      test('Should return a 400 status code and an "Invalid ID" error message if the id is not an Object ID (mongoose)', async () => {
        const response = await supertest(app).get('/api/chats/iyvcvuvu');

        expect(response.statusCode).toBe(400);

        expect(response.body).toMatchObject({
          message: 'Invalid ID',
          data: null,
          success: false,
        });
      });

      test('Should return a 404 status code and an "Chat not Found" error message if the chat do not exist', async () => {
        const response = await supertest(app).get(
          '/api/users/63738684332ad562cd9377ea',
        );

        expect(response.statusCode).toBe(404);

        expect(response.body).toMatchObject({
          message: 'User not found',
          data: null,
          success: false,
        });
      });

      test('Should return a 200 status code and an "User Found" error message if the chat do not exist', async () => {
        const response = await supertest(app).get(
          '/api/users/63720086972582efefe60495',
        );

        expect(response.statusCode).toBe(200);

        expect(response.body.data).toBeDefined();
      });
    });
  });
});
