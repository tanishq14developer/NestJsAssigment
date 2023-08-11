import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { APP_PIPE } from '@nestjs/core';
import * as winston from 'winston';
import { ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/api-config.service';
import { SharedModule } from './shared/shared.module';
import { VideosModule } from 'modules/videos/videos.module';
import { WatchLaterModule } from 'modules/watch-later/watch-later.module';

@Module({
    imports: [
        HttpModule,
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ApiConfigService) =>
                configService.postgresConfig,
            inject: [ApiConfigService],
        }),
        UserModule,
        AuthModule,
        VideosModule,
        WatchLaterModule,

        WinstonModule.forRoot({
            transports: [new winston.transports.Console()],
            // options
        }),
    ],
    providers: [{
        provide: APP_PIPE,
        useClass: ValidationPipe
    }],
    exports: [TypeOrmModule],
    controllers: [AppController],
})
export class AppModule { }
