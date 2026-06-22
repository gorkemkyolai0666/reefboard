import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  findAll(
    @Request() req: any,
    @Query('page') page?: string,
    @Query('condition') condition?: string,
    @Query('equipmentType') equipmentType?: string,
  ) {
    return this.equipmentService.findAll(req.user.centerId, {
      page: page ? parseInt(page) : undefined,
      condition,
      equipmentType,
    });
  }

  @Post()
  create(@Request() req: any, @Body() dto: CreateEquipmentDto) {
    return this.equipmentService.create(req.user.centerId, dto);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateEquipmentDto) {
    return this.equipmentService.update(req.user.centerId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.equipmentService.remove(req.user.centerId, id);
  }
}
