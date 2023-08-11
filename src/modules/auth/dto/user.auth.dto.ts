import { ApiProperty } from "@nestjs/swagger";
export class UserAuthDto {
    @ApiProperty()
    fullName?: string;
    @ApiProperty()
    email?: string;
    @ApiProperty()
    accessToken?: string;
    constructor(user: UserResponse) {
        this.fullName = user.fullName;
        this.email = user.email;
        this.accessToken = user.accessToken;
    }

}

interface UserResponse {
    fullName?: string;
    email?: string;
    accessToken?: string;
}