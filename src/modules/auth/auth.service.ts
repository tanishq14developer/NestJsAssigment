import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginRequestDto, UserRequestDto } from 'modules/user/dto/user-request.dto';
import { ApiResponse } from 'utils';
import { Message, RoleType } from "./../../constants";
import * as bcrypt from 'bcrypt';
import { UserService } from './../user/user.service';
import { UserAuthDto } from './dto/user.auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }
    async signUpUser(userDto: UserRequestDto): Promise<ApiResponse<UserAuthDto | null>> {
        const user = await this.userService.getUserByEmail({ email: userDto.email });
        if (user?.email === userDto.email || user != null) {
            return new ApiResponse<UserAuthDto | null>(null, {
                message: Message.FAILED,
                displayMessage: Message.USER_ALREADY_EXISTS
            });
        } else {
            const newUser = await this.userService.createUser(userDto);
            let accessToken = this.generateToken(newUser.id, RoleType.USER);
            return new ApiResponse<UserAuthDto | null>(this.userAuth({
                fullName: newUser.fullName,
                email: newUser.email,
                accessToken: accessToken,
            }), {
                message: Message.SUCCESS,
                displayMessage: Message.SUCCESS
            });
        }

    }

    async signInUser(userDto: UserLoginRequestDto): Promise<ApiResponse<UserAuthDto | null>> {
        const user = await this.userService.getUserByEmail({ email: userDto.email });

        if (user && user.password !== null && await bcrypt.compare(userDto.password, user.password)) {
            const accessToken = this.generateToken(user.id, RoleType.USER);
            const userAuthDto: UserAuthDto = {
                fullName: user.fullName,
                email: user.email,
                accessToken: accessToken,
            };
            return new ApiResponse<UserAuthDto | null>(this.userAuth(userAuthDto), {
                message: Message.SUCCESS,
                displayMessage: Message.SUCCESS,
            });
        } else {
            return new ApiResponse<UserAuthDto | null>(null, {
                message: Message.FAILED,
                displayMessage: Message.INVALID_CREDENTIALS,
            });
        }
    }
    userAuth(user: UserAuthDto): UserAuthDto {
        return new UserAuthDto({
            fullName: user.fullName,
            email: user.email,
            accessToken: user.accessToken,


        });
    }

    generateToken(userId?: string, role?: RoleType): string {
        return this.jwtService.sign({ userId, role });
    }
}
