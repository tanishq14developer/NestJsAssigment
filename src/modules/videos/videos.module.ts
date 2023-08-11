import { Module, } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./entities/video.entity";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([Video])],
    controllers: [VideosController],
    providers: [VideosService],
    exports: [VideosService],
})
export class VideosModule { }
