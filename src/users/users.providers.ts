
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { DATA_SOURCE_PROVIDER, USER_REPOSITORY_PROVIDER } from '../../constants';

export const userProviders = [
    {
        provide: USER_REPOSITORY_PROVIDER,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [DATA_SOURCE_PROVIDER],
    },
];
