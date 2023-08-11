import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

import { AppController } from './../src/app.controller';
import { AuthModule } from './../src/modules/auth/auth.module';
import { UserModule } from './../src/modules/user/user.module';
import ormConfig from './orm-config';

describe('Auth Module Integration', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(ormConfig), UserModule, AuthModule],
            controllers: [AppController],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/auth/send-mobile-otp (POST)', () => {
        it('should return 201', async () => {
            const requestBody = {
                mobileNumber: '123456789',
                countryCode: '91',
            };
            const response = await request(app.getHttpServer())
                .post('/auth/send-mobile-otp')
                .send(requestBody);

            expect(response.status).toBe(201);
        });

        it('should return invalid otp', async () => {
            const requestBody = {
                mobileOtp: '1234',
            };
            const response = await request(app.getHttpServer())
                .post('/auth/verify-otp')
                .send(requestBody);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'OTP is invalid');
        });

    });


});
