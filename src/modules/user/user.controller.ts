import { Controller, Get } from '@nestjs/common';
import { RoleType } from './../../constants';
import { AuthUser } from './../../decorators/auth-user.decorator';
import { Auth } from './../../decorators/http.decorator';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
    @Auth([RoleType.USER])
    @Get('/')
    profile(@AuthUser() user: UserEntity) {
        return user;
    }
}
