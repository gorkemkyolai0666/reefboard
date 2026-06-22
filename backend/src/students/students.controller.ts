import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll(
    @Request() req: any,
    @Query('page') page?: string,
    @Query('status') status?: string,
    @Query('certLevel') certLevel?: string,
  ) {
    return this.studentsService.findAll(req.user.centerId, {
      page: page ? parseInt(page) : undefined,
      status,
      certLevel,
    });
  }

  @Post()
  create(@Request() req: any, @Body() dto: CreateStudentDto) {
    return this.studentsService.create(req.user.centerId, dto);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(req.user.centerId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.studentsService.remove(req.user.centerId, id);
  }
}
