import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDiveLogDto } from './dto/create-divelog.dto';
import { UpdateDiveLogDto } from './dto/update-divelog.dto';

@Injectable()
export class DiveLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(centerId: string, params?: { page?: number; studentId?: string }) {
    const page = params?.page || 1;
    const take = 20;
    const skip = (page - 1) * take;

    const where: any = { centerId };
    if (params?.studentId) where.studentId = params.studentId;

    const [data, total] = await Promise.all([
      this.prisma.diveLog.findMany({
        where,
        skip,
        take,
        orderBy: { diveDate: 'desc' },
        include: { student: { select: { firstName: true, lastName: true } } },
      }),
      this.prisma.diveLog.count({ where }),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / take) };
  }

  async create(centerId: string, dto: CreateDiveLogDto) {
    return this.prisma.diveLog.create({
      data: {
        ...dto,
        diveDate: new Date(dto.diveDate),
        centerId,
      },
    });
  }

  async update(centerId: string, id: string, dto: UpdateDiveLogDto) {
    const log = await this.prisma.diveLog.findFirst({ where: { id, centerId } });
    if (!log) throw new NotFoundException('Dalış kaydı bulunamadı');
    const data: any = { ...dto };
    if (dto.diveDate) data.diveDate = new Date(dto.diveDate);
    return this.prisma.diveLog.update({ where: { id }, data });
  }

  async remove(centerId: string, id: string) {
    const log = await this.prisma.diveLog.findFirst({ where: { id, centerId } });
    if (!log) throw new NotFoundException('Dalış kaydı bulunamadı');
    return this.prisma.diveLog.delete({ where: { id } });
  }
}
