import { WatchLater } from './../../watch-later/entities/watch-later.entity';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { AbstractEntity } from 'shared/entity/abstract.entity';

@Entity({ name: 'Videos' })
export class Video {
    @Column({ length: 255, nullable: true })
    publishTime: string;

    @Column({ length: 255, nullable: true })
    channelName: string;

    @PrimaryColumn({ length: 255, nullable: false })
    videoId: string;

    @Column({ length: 255, nullable: true })
    videoName: string;

    @Column({ length: 255, nullable: true })
    videoUrl: string;

    @Column({ length: 255, nullable: true })
    videoDescription: string;

    @Column({ length: 255, nullable: true })
    videoThumbnail: string;

    // Define the One-to-Many relationship
    @OneToMany(() => WatchLater, (watchLater) => watchLater.videoId)
    watchLater: WatchLater[];


    @CreateDateColumn({
        type: "timestamp",
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: "timestamp",
    })
    deletedAt: Date;
}
