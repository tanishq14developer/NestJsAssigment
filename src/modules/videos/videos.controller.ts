import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateVideoDto, FindVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PaginationDto, VideoResponseDto } from './dto/pagination.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'utils';
import { Video } from './entities/video.entity';
import { Message, RoleType } from "./../../constants";
import { AuthGuard } from 'guards/auth.guard';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { RolesGuard } from 'guards/roles.guard';
import { UserEntity } from 'modules/user/user.entity';
import { CommonRequestUser } from 'shared/dto/common-request-user.interface';


@ApiTags('videos')
@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) { }




    @Cron(CronExpression.EVERY_2ND_HOUR)
    handleCron() {
        console.log('Called when the current second');
        return this.videosService.fetchVideoAndSave();
    }

    @Get('/api/getVideos')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    findAllWithPagination(@Query() videoRequest: PaginationDto, @Req() request: CommonRequestUser): Promise<ApiResponse<VideoResponseDto>> {

        let videos = this.videosService.findAllWithPagination(videoRequest, request);
        return videos;

    }

    @Get('/getVideoById')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    findOne(@Query() id: FindVideoDto): Promise<ApiResponse<Video | null>> {
        let video = this.videosService.findOne(id);
        return video;
    }



}


