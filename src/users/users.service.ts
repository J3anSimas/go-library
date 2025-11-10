import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY_PROVIDER } from '../../constants';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }
    findByEmail() {

    }
}
