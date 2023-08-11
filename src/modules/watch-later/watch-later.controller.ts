import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { WatchLaterService } from './watch-later.service';
import { CreateWatchLaterDto, RemoveVideoByWatchLaterId, WatchLaterPaginatedResponse, WatchLaterPaginationDto } from './dto/create-watch-later.dto';
import { UpdateWatchLaterDto } from './dto/update-watch-later.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommonRequestUser } from 'shared/dto/common-request-user.interface';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { CreateVideoDto } from 'modules/videos/dto/create-video.dto';


@ApiTags('watch-later')
@Controller('watch-later')
export class WatchLaterController {
    constructor(private readonly watchLaterService: WatchLaterService) { }

    @Post('addWatchLater')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    create(@Body() createVideoDto: CreateWatchLaterDto, @Req() request: CommonRequestUser) {
        return this.watchLaterService.createWatchLater(createVideoDto, request);

    }

    @Get('getWatchLaterList')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    findAll(@Query() paginationDto: WatchLaterPaginationDto, @Req() request: CommonRequestUser) {
        return this.watchLaterService.getWatchLaterList(paginationDto, request);
    }

    @Delete('removeVideoByWatchLater')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    remove(@Body() removeDto: RemoveVideoByWatchLaterId, @Req() request: CommonRequestUser) {
        return this.watchLaterService.removeVideoByWatchLaterId(removeDto, request);
    }
}
