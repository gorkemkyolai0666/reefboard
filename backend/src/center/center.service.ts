import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCenterDto } from './dto/update-center.dto';

@Injectable()
export class CenterService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(centerId: string) {
    const center = await this.prisma.center.findUnique({ where: { id: centerId } });
    if (!center) throw new NotFoundException('Merkez bulunamadı');
    return center;
  }

  async update(centerId: string, dto: UpdateCenterDto) {
    const center = await this.prisma.center.findUnique({ where: { id: centerId } });
    if (!center) throw new NotFoundException('Merkez bulunamadı');
    return this.prisma.center.update({ where: { id: centerId }, data: dto });
  }
}
