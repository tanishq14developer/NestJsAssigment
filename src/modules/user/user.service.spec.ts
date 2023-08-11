import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            metadata: {
              propertiesMap: {},
            },
          },
        },
      ],
    }).compile();

    service = module.get(UserService);
    repository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  // describe('create user', () => {
  //   it('should create user correctly', async function () {
  //     const user = {
  //       mobileNumber: '12345678',
  //     };
  //     jest
  //       .spyOn(repository, 'save')
  //       .mockResolvedValue(Object.assign(new UserEntity(), user));
  //     await service.createUser(user);

  //     expect(repository.save).toBeCalledWith(
  //       Object.assign(new UserEntity(), user),
  //     );
  //   });
  // });

  describe('find user', () => {
    it('should find user correctly', async function () {
      const user = { mobileNumber: '12345678' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(user as UserEntity);
      const userResult = await service.findUser({
        mobileNumber: user.mobileNumber,
      });

      expect(userResult).toBe(user);
      expect(repository.findOne).toBeCalledWith({
        where: { mobileNumber: user.mobileNumber },
      });
    });

    // it('should update user', async () => {
    //   const user = {
    //     id: 'abc',
    //     mobileNumber: '12345678',
    //   };
    //   jest.spyOn(repository, 'update').mockResolvedValue({} as never);
    //   await service.updateUser(user.id, {
    //     mobileNumber: user.mobileNumber,
    //   });
    //   expect(repository.update).toBeCalledWith(
    //     { id: user.id },
    //     { mobileNumber: user.mobileNumber },
    //   );
    // });
  });
});
