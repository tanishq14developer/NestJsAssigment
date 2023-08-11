import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from './../user/dto/user.dto';

export class AuthData extends UserDto {
  @ApiProperty()
  token: string;
}

export class AuthRO {
  @ApiProperty()
  user: AuthData;
}
