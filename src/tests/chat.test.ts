import * as supertest from 'supertest';
import { app } from '../index'; 


describe('chats' , () => {
    describe('Get chats endpoint' , () => {
        describe('Get chat by id' , () => {

            // test('Should return a 404 status code and an "Invalid ID" error message if the id is not an Object ID (mongoose)', async () => {

            //     const response = await supertest(app).get('/api/chats/iyvcvuvu')

            //     expect(response.statusCode).toBe(404)

            //     expect(response.body).toMatchObject({
            //         message : 'Invalid ID',
            //         data : null ,
            //         success : false
            //     })

            // });

            test('Should return a 404 status code and an "Chat Not Found" error message if the chat do not exist', async () => {
                
                const response = await supertest(app).get('/api/chats/63738684332ad562cd9176ea')

                expect(response.statusCode).toBe(404)

                expect(response.body).toMatchObject({
                    message : 'Chat Not Found',
                    data : null,
                    success : false
                })

            })
        })
    })
})