
import * as supertest from 'supertest';
import {app} from '../index'

describe('chats' , () => {


    describe('get chat by id', () => {

        describe('if chat does not exist', () => {
            it('should return 404' , async (done) => {
                await   supertest(app).get('/').expect(200).end((err , res) => {
                 if (err) return done(err)

                 expect(res.body).toMatchObject({
                    message : 'Server is running'
                 })
               })
            } , 100000)
        })
    })
})