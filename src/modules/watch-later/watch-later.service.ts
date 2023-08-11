import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from 'modules/user/user.service';

import { Video } from 'modules/videos/entities/video.entity';
import { VideosService } from 'modules/videos/videos.service';

import { CommonRequestUser } from 'shared/dto/common-request-user.interface';
import { Repository } from 'typeorm';
import { ApiResponse } from 'utils';
import { CreateWatchLaterDto, RemoveVideoByWatchLaterId, UsersResponse, WatchLaterPaginatedResponse, WatchLaterPaginationDto, WatchLaterResponse } from './dto/create-watch-later.dto';
import { WatchLater } from './entities/watch-later.entity';

@Injectable()
export class WatchLaterService {

    constructor(
        @InjectRepository(WatchLater)
        private readonly watchRepository: Repository<WatchLater>,
        private readonly userService: UserService,
        private readonly videoService: VideosService,
    ) { }

    async createWatchLater(createVideoDto: CreateWatchLaterDto, request: CommonRequestUser): Promise<ApiResponse<WatchLaterResponse | null>> {
        try {
            const id = request.user.id;

            // Ensure that the user exists
            const user = await this.userService.findOne(id);
            if (!user) {
                return new ApiResponse<WatchLaterResponse | null>(null, {
                    message: 'failure',
                    displayMessage: "User not found",
                });
            }
            const videoId = createVideoDto.videoId;
            const video = await this.videoService.findByVideoId(videoId);

            if (!video) {
                return new ApiResponse<WatchLaterResponse | null>(null, {
                    message: 'failure',
                    displayMessage: "Video not found with the given id",
                });
            }
            // Create the WatchLater entry and associate it with the user and video
            const watchLater = new WatchLater();
            watchLater.userId = user;
            watchLater.videoId = video as any;
            // Save the WatchLater entry to the database
            const savedWatchLater = await this.watchRepository.save(watchLater);


            return new ApiResponse<WatchLaterResponse>(this.watchLater(savedWatchLater.watchLaterId, video as any, user as any), {
                message: 'success',
                displayMessage: "Video added to watch later",
            });
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('An error occurred while adding the video to watch later');
        }
    }

    watchLater(watchLaterId: string, video: Video, user: UsersResponse) {
        const transformedUser: UsersResponse = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,

        };
        return new WatchLaterResponse({
            watchLaterId: watchLaterId,
            videos: video,
            user: transformedUser,
        });
    }


    async getWatchLaterList(
        paginationDto: WatchLaterPaginationDto,
        request: CommonRequestUser
    ): Promise<ApiResponse<WatchLaterPaginatedResponse>> {
        const id = request.user.id;

        const [watchLaterEntries, totalCount] = await this.watchRepository
            .createQueryBuilder('watchLater')
            .where('watchLater.user = :user', { user: id })
            .skip(parseInt(paginationDto.offset))
            .take(parseInt(paginationDto.limit))
            .getManyAndCount();

        console.log(watchLaterEntries);

        const watchLaterResponses = watchLaterEntries.map(watchLater => ({
            watchLaterId: watchLater.watchLaterId,
            videos: watchLater.videoId,
            user: watchLater.userId,
        }));

        console.log(watchLaterResponses);

        return new ApiResponse<WatchLaterPaginatedResponse>(
            new WatchLaterPaginatedResponse({
                total: totalCount,
                data: watchLaterResponses,
            }),
            {
                message: 'success',
                displayMessage: 'Watch later list retrieved successfully',
            }
        );
    }

    watchLaterList(total: number, watchLater: WatchLaterResponse[]) {
        return new WatchLaterPaginatedResponse({
            total: total,
            data: watchLater,
        });

    }

    async removeVideoByWatchLaterId(id: RemoveVideoByWatchLaterId, request: CommonRequestUser): Promise<ApiResponse<WatchLater | null>> {
        const userId = request.user.id;
        const user = await this.userService.findOne(userId);

        const watchLater = await this.watchRepository.createQueryBuilder('watchLater')
            .where('watchLater.watchLaterId = :watchLaterId', { watchLaterId: id.watchLaterId })
            .andWhere('watchLater.userId = :userId', { userId: user?.id })
            .getOne();

        if (!watchLater) {
            throw new NotFoundException('WatchLater entry not found');
        }

        await this.watchRepository.remove(watchLater);
        return new ApiResponse<WatchLater | null>(null, {
            message: 'success',
            displayMessage: 'Video removed from watch later',
        });


    }
}
