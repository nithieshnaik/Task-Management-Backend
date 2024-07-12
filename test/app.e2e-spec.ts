import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';
import { category } from '../src/task/schemas/task.schema';

describe(' Task & Auth Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    
    await mongoose.connection.db.dropDatabase();

   
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  const user = {
    name: 'goutham',
    email: 'goutham@gmail.com',
    password: '12345678'
  }

  const task = {
    title: "queens of islands",
    description: "book should be read",
    category: category.IMPORTANT,
  }

  let jwtToken: string = '';
  let taskcreated: any;

  it(' (POST) - Register a new user', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(user)
      .expect(201)
      .then((res) => {
        expect(res.body.token).toBeDefined();
      });
  });

  it(' (GET) - Login user', () => {
    return request(app.getHttpServer())
      .get('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200)
      .then((res) => {
        expect(res.body.token).toBeDefined();
        jwtToken = res.body.token;
      });
  });

  describe('Task', () => {
    it(' (POST) - Create new task', async () => {
      return request(app.getHttpServer())
        .post('/task')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(task)
        .expect(201)
        .then((res) => {
          expect(res.body._id).toBeDefined();
          expect(res.body.title).toEqual(task.title);
          taskcreated = res.body;
        });
    });

    it(' (GET) - get all tasks', async () => {
      return request(app.getHttpServer())
        .get('/task')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBe(1);
        });
    });

    it(' (GET) - get a task by id', async () => {
      return request(app.getHttpServer())
        .get(`/task/${taskcreated?._id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body._id).toEqual(taskcreated._id);
        });
    });

    it(' (PUT) - Update a task by id', async () => {
      const updatedTask = { title: "updated name" };
      return request(app.getHttpServer())
        .put(`/task/${taskcreated?._id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(updatedTask)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.title).toEqual(updatedTask.title);
        });
    });

    it(' (DELETE) - Delete a task by id', async () => {
      return request(app.getHttpServer())
        .delete(`/task/${taskcreated?._id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.deleted).toEqual(true);
        });
    });
  });
});
