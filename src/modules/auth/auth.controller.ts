import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginRequestDto, UserRequestDto } from 'modules/user/dto/user-request.dto';
import { ApiResponse } from 'utils';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user.auth.dto';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) { }

    @ApiOkResponse({ description: 'This api will be used for registeration i.e. for signup.' })
    @Post('userSignUp')
    async userSignUp(
        @Body() registerDto: UserRequestDto,
    ): Promise<ApiResponse<UserAuthDto | null>> {
        let user = await this.authService.signUpUser(registerDto);
        return user;

    }

    @ApiOkResponse({
        description:
            'This api will be used to send otp on mobile for signup.',
    })
    @Post('userSignIn')
    async userLogin(
        @Body() loginDto: UserLoginRequestDto,
    ): Promise<ApiResponse<UserAuthDto | null>> {
        let user = await this.authService.signInUser(loginDto);
        return user;

    }
}
