import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { RoleType } from '../../constants';
import { GeneratorProvider } from '../../providers/generator.provider';
import { UserEntity } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('mobileOtp', () => {
    it('should return otp for new user', async () => {
      const otp = '1234';
      jest
        .spyOn(GeneratorProvider, 'generateVerificationCode')
        .mockResolvedValue(otp as never);

      jest.spyOn(userService, 'findUser').mockResolvedValue(null);
      jest.spyOn(userService, 'createUser').mockResolvedValue({} as never);

      const registerDto = {
        mobileNumber: '7894561232',
        countryCode: '91',
        otp: '123456',
      };

      const acutalOtp = await authService.sendMobileOtp(
        registerDto.mobileNumber,
        registerDto.countryCode,
      );
      expect(acutalOtp).toBe(otp);
    });

    it('should return otp for existing user', async () => {
      const otp = '1234';
      jest
        .spyOn(GeneratorProvider, 'generateVerificationCode')
        .mockReturnValue(otp);

      jest
        .spyOn(userService, 'findUser')
        .mockResolvedValue(Object.assign(new UserEntity(), { id: '1' }));
      jest.spyOn(userService, 'updateUser').mockResolvedValue({} as never);
      const registerDto = {
        mobileNumber: '7894561232',
        countryCode: '91',
        otp,
      };

      const acutalOtp = await authService.sendMobileOtp(
        registerDto.mobileNumber,
        registerDto.countryCode,
      );
      expect(acutalOtp).toBe(otp);
      expect(userService.updateUser).toBeCalledWith('1', { mobileOtp: otp });
    });
    it('should throw error when otp is invalid', async () => {
      jest.spyOn(userService, 'findUser').mockResolvedValueOnce(null);
      const registerDto = {
        mobileOtp: '1234',
      };

      await expect(authService.verifyOtp(registerDto)).rejects.toThrow(
        new BadRequestException('OTP is invalid'),
      );
    });
    it('should send token when otp is valid', async () => {
      jest
        .spyOn(userService, 'findUser')
        .mockResolvedValueOnce(
          Object.assign(new UserEntity(), { id: '1', role: RoleType.USER }),
        );
      jest
        .spyOn(authService, 'generateToken')
        .mockReturnValueOnce('token' as never);
      jest.spyOn(userService, 'updateUser').mockResolvedValue({} as never);

      const registerDto = {
        mobileOtp: '1234',
      };

      const user = await authService.verifyOtp(registerDto);
      expect(user).toHaveProperty('token', 'token');
      expect(user).toHaveProperty('isMobileVerified', true);
    });
  });

  // describe('login', () => {
  //   it('should return user profile when login successful', async () => {
  //     jest
  //       .spyOn(authService, 'validateUser')
  //       .mockResolvedValue({ foo: 'bar' } as never);
  //     jest.spyOn(authService, 'generateToken').mockReturnValue('token');
  //     const loginDto: LoginDto = { email: 'foo@bar.com', password: '123456' };

  //     const authData = await authService.login(loginDto);

  //     expect(authData).not.toHaveProperty('password');
  //     expect(authData).toHaveProperty('foo', 'bar');
  //     expect(authData).toHaveProperty('token', 'token');
  //   });
  // });

  // describe('validate user', () => {
  //   it('should return user info without password when validate successful', async () => {
  //     const email = 'foo@bar.com';
  //     const password = cryptoPassword('12345678');
  //     jest
  //       .spyOn(userService, 'findUser')
  //       .mockResolvedValue({ email, password } as UserEntity);
  //     const user = await authService.validateUser(email, '12345678');

  //     expect(user).toHaveProperty('email', email);
  //     expect(user).not.toHaveProperty('password');
  //   });

  //   it('should throw bad request exception when invalid user', async () => {
  //     jest.spyOn(userService, 'findUser').mockResolvedValue(null);

  //     const validateUser = authService.validateUser('foo@bar.com', '');
  //     await expect(validateUser).rejects.toThrow(
  //       new BadRequestException('user is not exist'),
  //     );
  //   });

  //   it('should throw bad request exception when invalid password', async () => {
  //     const password =
  //       '4a83854cf6f0112b4295bddd535a9b3fbe54a3f90e853b59d42e4bed553c55a4';
  //     jest
  //       .spyOn(userService, 'findUser')
  //       .mockResolvedValue({ email: 'foo@bar.com', password } as UserEntity);

  //     const validateUser = authService.validateUser(
  //       'foo@bar.com',
  //       'invalidPassword',
  //     );
  //     await expect(validateUser).rejects.toThrow(
  //       new BadRequestException('password is invalid'),
  //     );
  //   });
  // });

  // describe('generateToken', () => {
  //   it('should return JWT', () => {
  //     const token = authService.generateToken('1', 'foo@bar.com');

  //     expect(token).toBe('token');
  //   });
  // });
});
