
import { WatchLater } from './../watch-later/entities/watch-later.entity';
import { Column, Entity, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { RoleType } from './../../constants';
import { RiskStatus } from './../../constants/risk-status';
import { AbstractEntity } from './../../shared/entity/abstract.entity';

@Entity({ name: 'Users' })
export class UserEntity extends AbstractEntity {
    @Column({ length: 255, nullable: true })
    fullName: string;
    @Column({ length: 255, nullable: true })
    email: string
    @Column({ length: 255, nullable: true })
    password: string;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    role: RoleType;

    @OneToMany(() => WatchLater, (watchLater) => watchLater.userId,)
    watchLater: WatchLater[];

}
