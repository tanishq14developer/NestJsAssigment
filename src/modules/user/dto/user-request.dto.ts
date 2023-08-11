import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"
import { IsEmail } from './../../../decorators/IsEmail.decorator';
export class UserRequestDto {
    @ApiProperty()
    @IsString()
    fullName?: string;

    @ApiProperty()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsString()
    password?: string;
}

export class UserLoginRequestDto {
    @ApiProperty()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsString()
    password: string;
}