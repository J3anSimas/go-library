import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Req, Res } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user-role.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post()
    @UseInterceptors(FileInterceptor('photo'))
    @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
    async create(@Body() createEmployeeDto: CreateEmployeeDto, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
                new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })
            ]
        })
    ) photo: Express.Multer.File, @Req() request, @Res() response) {
        const employee = await this.employeesService.create(createEmployeeDto, photo, request.user);
        response.header('Location', `/employees/${employee.id}`)
        return employee

    }

    @Get()
    findAll() {
        return this.employeesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.employeesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.employeesService.update(+id, updateEmployeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.employeesService.remove(+id);
    }
}
