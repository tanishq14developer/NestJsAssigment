import { forwardRef, Module } from '@nestjs/common';
import { WatchLaterService } from './watch-later.service';
import { WatchLaterController } from './watch-later.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchLater } from './entities/watch-later.entity';
import { VideosModule } from 'modules/videos/videos.module';
import { UserModule } from 'modules/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([WatchLater]), UserModule, forwardRef(() => VideosModule)],
    controllers: [WatchLaterController],
    providers: [WatchLaterService],
    exports: [WatchLaterService]

})
export class WatchLaterModule { }
