import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Video } from "../entities/video.entity";

export class PaginationDto {
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

    @ApiPropertyOptional({ example: "" })
    @IsOptional()
    @IsString()
    search: string;
}

export class VideoResponseDto {
    total: number;
    data: Video[];

    constructor(total: number, data: Video[]) {
        this.total = total;
        this.data = data;
    }
}