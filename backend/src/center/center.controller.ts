import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { CenterService } from './center.service';
import { UpdateCenterDto } from './dto/update-center.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('center')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Get()
  findOne(@Request() req: any) {
    return this.centerService.findOne(req.user.centerId);
  }

  @Patch()
  update(@Request() req: any, @Body() dto: UpdateCenterDto) {
    return this.centerService.update(req.user.centerId, dto);
  }
}
