import { JwtService } from '@nestjs/jwt';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserEntity } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import type { SendOtpDto } from './dto/auth.dto';

describe('Auth Controller', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockUserProfile = {
    id: '1',
    email: 'foo@bar.com',
    createdAt: '',
    updatedAt: '',
    username: 'foo',
    bio: null,
    image: null,
    token: 'token',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendMobileOtp', () => {
    it('should call sendMobileOtp service when call sendMobileOtp controller', async () => {
      jest.spyOn(authService, 'sendMobileOtp').mockResolvedValue('1234');

      const registerDto: SendOtpDto = {
        mobileNumber: '123456',
        countryCode: '9',
      };
      const res = await controller.sendMobileOtp(registerDto);
      expect(res.otp).toEqual('1234');
    });
  });
});
