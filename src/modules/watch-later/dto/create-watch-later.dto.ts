import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { Video } from "modules/videos/entities/video.entity";

export class CreateWatchLaterDto {
    @ApiProperty()
    @IsString()
    videoId: string


}


export class RemoveVideoByWatchLaterId {
    @ApiProperty()
    @IsUUID()
    watchLaterId: string
}

export class UsersResponse {
    @ApiProperty()
    id: string

    @ApiProperty()
    fullName: string

    @ApiProperty()
    email: string

    constructor(data: Partial<UsersResponse>) {
        Object.assign(this, data);
    }

}

export class WatchLaterResponse {
    @ApiProperty()
    watchLaterId: string;

    @ApiProperty()
    videos: Video;

    @ApiProperty()
    user: UsersResponse;

    constructor(data: Partial<WatchLaterResponse>) {
        Object.assign(this, data);
    }
}




export class WatchLaterPaginatedResponse {
    @ApiProperty()
    total: number

    @ApiProperty()
    data: WatchLaterResponse[]

    constructor(data: Partial<WatchLaterPaginatedResponse>) {
        Object.assign(this, data);
    }
}

export class WatchLaterPaginationDto {
    @ApiProperty()
    @IsString()
    limit: string;
    @ApiProperty()
    @IsString()
    offset: string;

    @ApiPropertyOptional()
    sortBy?: string;
    @ApiPropertyOptional()
    sortOrder?: 'ASC' | 'DESC';
}
