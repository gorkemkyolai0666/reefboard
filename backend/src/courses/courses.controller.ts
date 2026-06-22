import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(
    @Request() req: any,
    @Query('page') page?: string,
    @Query('status') status?: string,
    @Query('courseType') courseType?: string,
  ) {
    return this.coursesService.findAll(req.user.centerId, {
      page: page ? parseInt(page) : undefined,
      status,
      courseType,
    });
  }

  @Post()
  create(@Request() req: any, @Body() dto: CreateCourseDto) {
    return this.coursesService.create(req.user.centerId, dto);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(req.user.centerId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.coursesService.remove(req.user.centerId, id);
  }
}
