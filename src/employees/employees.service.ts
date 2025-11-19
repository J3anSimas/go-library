import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid'
import sharp from 'sharp';
import { S3Service } from 'src/aws/s3.service';
import { DataSource, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/entities/user-role.entity';

@Injectable()
export class EmployeesService {
    constructor(
        private readonly s3Service: S3Service,
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly dataSource: DataSource
    ) { }
    async create(createEmployeeDto: CreateEmployeeDto, file: Express.Multer.File, user: User) {
        try {
            this.assertValidImage(file);
            await this.assertImageIsNotCorrupted(file);
            await this.assertImageDimensions(file.buffer);
            return await this.dataSource.transaction(async (manager) => {
                const employeeCreating = await manager.findOne(Employee, {
                    where: { user: { id: user.id } },
                    relations: ['user']
                })
                if (!employeeCreating)
                    throw new NotFoundException('Employee not found for this user')
                const emailExists = await manager.findOne(User, {
                    where: { email: createEmployeeDto.email.toLowerCase() },
                });

                if (emailExists) {
                    throw new ConflictException('E-mail already exists');
                }
                const newUser = manager.create(User, {
                    id: uuid(),
                    email: createEmployeeDto.email.toLowerCase(),
                    role: UserRole.EMPLOYEE,
                    is_active: true,
                    is_verified: false,
                })
                const savedUser = await manager.save(newUser)
                const employee = manager.create(Employee, {
                    name: createEmployeeDto.name,
                    user: savedUser,
                    registration_code: createEmployeeDto.registration_code,
                    id: uuid(),
                    created_by: employeeCreating,
                })
                const savedEmployee = await manager.save(employee)
                let photo_url = await this.s3Service.upload(file, 'employees/photos')
                await manager.update(Employee, savedEmployee.id, { photo_url })

                // TODO: implementar envio de confirmação
                return {
                    id: savedEmployee.id,
                    name: savedEmployee.name,
                    registration_code: savedEmployee.registration_code,
                    photo_url,
                };

            })
        } catch (err) {
            if (err instanceof HttpException)
                throw err;
            console.error('[EmployeeService:create] Unexpected error:', err)
            throw new InternalServerErrorException('Failed to create employee')
        }

    }
    findAll() {
        return `This action returns all employees`;
    }

    findOne(id: number) {
        return `This action returns a #${id} employee`;
    }

    update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
        return `This action updates a #${id} employee`;
    }

    remove(id: number) {
        return `This action removes a #${id} employee`;
    }
    private assertValidImage(file: Express.Multer.File) {
        const signature = file.buffer.toString('hex', 0, 4);
        const allowed = ['89504e47', 'ffd8ffe0', 'ffd8ffe1'];

        if (!allowed.includes(signature)) {
            throw new BadRequestException('Arquivo não é uma imagem válida.');
        }
    }

    private async assertImageIsNotCorrupted(file: Express.Multer.File) {
        try {
            await sharp(file.buffer).metadata();
        } catch {
            throw new BadRequestException('Imagem inválida ou corrompida.');
        }
    }

    private async assertImageDimensions(buffer: Buffer) {
        const metadata = await sharp(buffer).metadata();
        if (metadata.width > 2000 || metadata.height > 2000) {
            throw new BadRequestException('Imagem muito grande.');
        }
    }
}
