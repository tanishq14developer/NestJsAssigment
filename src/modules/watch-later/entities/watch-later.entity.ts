import { UserEntity } from "../../user/user.entity";
import { Video } from "../../videos/entities/video.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../../shared/entity/abstract.entity";


@Entity({ name: 'WatchLater' })
export class WatchLater extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    watchLaterId: string;

    @ManyToOne(() => UserEntity, (user) => user.watchLater, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user' })
    userId: UserEntity;

    @ManyToOne(() => Video, (video) => video.watchLater, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'video' })
    videoId: Video;


}
