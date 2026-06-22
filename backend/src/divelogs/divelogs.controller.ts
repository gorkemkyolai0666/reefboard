import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { DiveLogsService } from './divelogs.service';
import { CreateDiveLogDto } from './dto/create-divelog.dto';
import { UpdateDiveLogDto } from './dto/update-divelog.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('divelogs')
export class DiveLogsController {
  constructor(private readonly diveLogsService: DiveLogsService) {}

  @Get()
  findAll(@Request() req: any, @Query('page') page?: string, @Query('studentId') studentId?: string) {
    return this.diveLogsService.findAll(req.user.centerId, {
      page: page ? parseInt(page) : undefined,
      studentId,
    });
  }

  @Post()
  create(@Request() req: any, @Body() dto: CreateDiveLogDto) {
    return this.diveLogsService.create(req.user.centerId, dto);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateDiveLogDto) {
    return this.diveLogsService.update(req.user.centerId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.diveLogsService.remove(req.user.centerId, id);
  }
}
