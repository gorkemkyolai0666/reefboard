import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(centerId: string, params?: { page?: number; condition?: string; equipmentType?: string }) {
    const page = params?.page || 1;
    const take = 20;
    const skip = (page - 1) * take;

    const where: any = { centerId };
    if (params?.condition) where.condition = params.condition;
    if (params?.equipmentType) where.equipmentType = params.equipmentType;

    const [data, total] = await Promise.all([
      this.prisma.equipment.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
      this.prisma.equipment.count({ where }),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / take) };
  }

  async create(centerId: string, dto: CreateEquipmentDto) {
    const data: any = { ...dto, centerId };
    if (dto.purchaseDate) data.purchaseDate = new Date(dto.purchaseDate);
    if (dto.lastServiceDate) data.lastServiceDate = new Date(dto.lastServiceDate);
    if (dto.nextServiceDate) data.nextServiceDate = new Date(dto.nextServiceDate);
    return this.prisma.equipment.create({ data });
  }

  async update(centerId: string, id: string, dto: UpdateEquipmentDto) {
    const eq = await this.prisma.equipment.findFirst({ where: { id, centerId } });
    if (!eq) throw new NotFoundException('Ekipman bulunamadı');
    const data: any = { ...dto };
    if (dto.purchaseDate) data.purchaseDate = new Date(dto.purchaseDate);
    if (dto.lastServiceDate) data.lastServiceDate = new Date(dto.lastServiceDate);
    if (dto.nextServiceDate) data.nextServiceDate = new Date(dto.nextServiceDate);
    return this.prisma.equipment.update({ where: { id }, data });
  }

  async remove(centerId: string, id: string) {
    const eq = await this.prisma.equipment.findFirst({ where: { id, centerId } });
    if (!eq) throw new NotFoundException('Ekipman bulunamadı');
    return this.prisma.equipment.delete({ where: { id } });
  }
}
