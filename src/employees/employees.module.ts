import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { AwsModule } from 'src/aws/aws.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    controllers: [EmployeesController],
    providers: [EmployeesService],
    imports: [AwsModule,
        TypeOrmModule.forFeature([Employee, User]),
    ]
})
export class EmployeesModule { }
