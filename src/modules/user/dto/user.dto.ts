import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { UserEntity } from '../user.entity';
import { RiskStatus, RoleType } from './../../../constants';
import { AbstractDto } from './../../../shared/dto/abstract.dto';

export class UserDto extends AbstractDto {
    @ApiPropertyOptional()
    fullName?: string;

    @ApiPropertyOptional()
    email?: string;

    @ApiPropertyOptional()
    password?: string;
    constructor(user: UserEntity) {
        super(user);
        this.fullName = user.fullName;
        this.email = user.email;
        this.password = user.password;
    }
}
