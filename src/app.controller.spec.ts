import { JwtService } from '@nestjs/jwt';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppController } from './app.controller';
import { AuthService } from './modules/auth/auth.service';
import { UserEntity } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    appController = app.get(AppController);
  });

  describe('Hello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.healthCheck()).toBe('Hello world!');
    });
  });
});
