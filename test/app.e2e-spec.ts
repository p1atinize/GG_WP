import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let user = {
    "email": "test@test.ru",
    "password": "848484844"
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
  });

  let access_token = '';
  let adId = 0;

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
        .post('/auth/login')
        .send(user)
        .expect(201)
        .expect(res => {
          access_token = res.body['access_token'];
          expect(res.body).toEqual(
              expect.objectContaining({
                access_token: expect.any(String),
              }),
          );
        });
  });

  it('/categories (GET)', () => {
    return request(app.getHttpServer())
        .get('/categories')
        .set('Authorization', 'Bearer '+access_token)
        .expect(200)
        .expect(res => {
          expect(res.body).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  name: expect.any(String),
                })
              ]),
          );
        });
  });

  it('/ads (GET)', () => {
    return request(app.getHttpServer())
        .get('/ads')
        .set('Authorization', 'Bearer '+access_token)
        .expect(200)
        .expect(res => {
          expect(res.body).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  description: expect.any(String),
                  category: expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String)
                  })
                })
              ]),
          );
        });
  });

  it('/ads/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/ads/1')
      .set('Authorization', 'Bearer '+access_token)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            description: expect.any(String),
            category: expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String)
            })
          })
        );
      });
  });

  it('/ads/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/ads/1')
      .set('Authorization', 'Bearer '+access_token)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            description: expect.any(String),
            category: expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String)
            })
          })
        );
      });
  });

  it('/ads (POST)', () => {
    return request(app.getHttpServer())
        .post('/ads')
        .set('Authorization', 'Bearer '+access_token)
        .send({
          "description": "123",
          "user": 1,
          "category": 1
        })
        .expect(201)
        .expect(res => {
          adId = res.body['id'];
          console.log(adId, 'vddvdvdv');
          expect(res.body).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                user: expect.any(Number),
                category: expect.any(Number),
                description: expect.any(String),
              }),
          );
        })
  });

  it(`/ads/${adId} (DELETE)`, () => {
    return request(app.getHttpServer())
        .delete(`/ads/${adId}`)
        .set('Authorization', 'Bearer '+access_token)
        .expect(200);
  });


  afterAll((done) => {
    app.close();
    done();
  });
});
