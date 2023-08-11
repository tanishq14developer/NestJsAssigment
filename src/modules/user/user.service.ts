import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserRequestDto } from './dto/user-request.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }


    async createUser(userInfo: Partial<UserRequestDto>): Promise<UserEntity> {

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(userInfo?.password!, saltRounds);
        const newUser = this.userRepository.create({
            fullName: userInfo?.fullName,
            email: userInfo.email,
            password: hashPassword,
        });
        const savedUser = await this.userRepository.save(newUser);
        return savedUser;
    }

    async getUserByEmail(by: { email?: string }) {
        return await this.userRepository.findOne({ where: by });

    }

    async getUserById(id: string) {
        return await this.userRepository.findOne({ where: { id: id } });
    }

    async find(by: Partial<UserEntity>): Promise<UserEntity | null> {
        return this.userRepository.findOneBy({ ...by });
    }

    async findOne(id: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { id } });
    }




    updateUser(userId: string, user: UserDto) {
        return this.userRepository.update({ id: userId }, user);
    }
}
