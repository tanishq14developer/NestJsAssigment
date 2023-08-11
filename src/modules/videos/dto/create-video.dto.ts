import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
export class CreateVideoDto {


    @ApiProperty()
    @IsString()
    publishTime: string

    @ApiProperty()
    @IsString()
    channelName: string


    @ApiProperty()
    @IsString()
    videoId: string

    @ApiProperty()
    @IsString()
    videoName: string

    @ApiProperty()
    @IsString()
    videoUrl: string

    @ApiProperty()
    @IsString()
    videoDescription: string

    @ApiProperty()
    @IsString()
    videoThumbnail: string

}

export class FindVideoDto {
    @ApiProperty()
    @IsString()
    videoId: string
}
