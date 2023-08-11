import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { UserEntity } from './../src/modules/user/user.entity';

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'qwerty',
  database: 'nestjs_test',
  entities: [UserEntity],
  dropSchema: true,
  synchronize: true,
};

export default ormConfig;
