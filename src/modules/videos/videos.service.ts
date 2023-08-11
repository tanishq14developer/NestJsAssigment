import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindOptionsWhere, ILike } from 'typeorm';
import { FindVideoDto } from './dto/create-video.dto';
import { Video } from './entities/video.entity';
import { HttpService } from "@nestjs/axios";
import { AxiosResponse, HttpStatusCode } from "axios";
import { PaginationDto, VideoResponseDto } from './dto/pagination.dto';
import { ApiResponse } from 'utils';
import { Message } from "./../../constants";
import { CommonRequestUser } from 'shared/dto/common-request-user.interface';



@Injectable()
export class VideosService {
    constructor(

        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
        private readonly httpService: HttpService,
    ) { }

    async fetchVideoAndSave(): Promise<void> {
        try {
            // Fetch YouTube videos
            const videos = await this.fetchYoutubeVideos();
            console.log(videos);

            // Extract relevant video information and filter out videos with missing videoId
            const videoEntity: Video[] = videos.items
                .filter((video: any) => video.id && video.id.videoId)
                .map((video: any) => {
                    const videoEntity = new Video();
                    videoEntity.videoId = video.id.videoId;
                    videoEntity.channelName = video.snippet.channelTitle;
                    videoEntity.publishTime = video.snippet.publishedAt;
                    videoEntity.videoName = video.snippet.title;
                    videoEntity.videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
                    videoEntity.videoDescription = video.snippet.description;
                    videoEntity.videoThumbnail = video.snippet.thumbnails.default.url;
                    return videoEntity;
                });

            // Find existing videoIds in the database
            const existingVideoIds = await this.videoRepository.find({
                select: ['videoId'],
                where: {
                    videoId: In(videoEntity.map((video) => video.videoId)),
                },
            });

            // Filter out videos that already exist in the database
            const videosToInsert: Video[] = videoEntity.filter((video) =>
                !existingVideoIds.some((existingVideo) => existingVideo.videoId === video.videoId)
            );

            if (videosToInsert.length > 0) {
                // Save new videos to the database
                await this.videoRepository.save(videosToInsert);
                console.log(`${videosToInsert.length} videos saved successfully.`);
            } else {
                console.log('No new videos to save.');
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    async findAllWithPagination(videoRequest: PaginationDto, user: CommonRequestUser): Promise<ApiResponse<VideoResponseDto>> {
        let where: FindOptionsWhere<Video> = {}
        if (videoRequest.search) {
            where = {
                videoName: ILike(`%${videoRequest.search}%`),
            };
        }
        const [videos, total] = await this.videoRepository.findAndCount({
            skip: parseInt(videoRequest.offset),
            take: parseInt(videoRequest.limit),
            where: where,

        });

        return new ApiResponse<VideoResponseDto>(this.videoResponse(total, videos), {
            message: Message.SUCCESS,
            displayMessage: Message.SUCCESS,
        });
    }

    videoResponse(total: number, data: Video[]): VideoResponseDto {
        return new VideoResponseDto(total, data);
    }



    async findOne(id: FindVideoDto): Promise<ApiResponse<Video | null>> {
        let video = await this.videoRepository.findOne({ where: { videoId: id.videoId } });
        return new ApiResponse<Video | null>(video, {
            message: Message.SUCCESS,
            displayMessage: Message.SUCCESS,
        });
    }
    async findByVideoId(videoId: string): Promise<Video | null> {
        let video = await this.videoRepository.findOne({ where: { videoId: videoId } });
        return video;
    }









    async fetchYoutubeVideos(): Promise<any> {
        try {
            const apiKey = process.env.GOOGLE_KEY;
            const baseUrl = 'https://www.googleapis.com/youtube/v3/';
            const endpoint = 'search';
            const maxResults = 20;
            const url = `${baseUrl}${endpoint}?key=${apiKey}&channelId=UC2p8wkJVSjsMsRv0MjTikgA&part=snippet,id&maxResults=${maxResults}`;
            const response: AxiosResponse = await this.httpService.axiosRef.get(url).catch((err) => err);
            if (response.status !== HttpStatusCode.Ok) {
                throw new BadRequestException(response.data);
            } else {
                return response.data;
            }

        } catch (error) {
            throw new BadRequestException(error);
        }
    }


}
