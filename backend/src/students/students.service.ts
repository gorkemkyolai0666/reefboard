import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(centerId: string, params?: { page?: number; status?: string; certLevel?: string }) {
    const page = params?.page || 1;
    const take = 20;
    const skip = (page - 1) * take;

    const where: any = { centerId };
    if (params?.status) where.status = params.status;
    if (params?.certLevel) where.certLevel = params.certLevel;

    const [data, total] = await Promise.all([
      this.prisma.student.findMany({ where, skip, take, orderBy: { lastName: 'asc' } }),
      this.prisma.student.count({ where }),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / take) };
  }

  async create(centerId: string, dto: CreateStudentDto) {
    const data: any = { ...dto, centerId };
    if (dto.birthDate) data.birthDate = new Date(dto.birthDate);
    return this.prisma.student.create({ data });
  }

  async update(centerId: string, id: string, dto: UpdateStudentDto) {
    const student = await this.prisma.student.findFirst({ where: { id, centerId } });
    if (!student) throw new NotFoundException('Öğrenci bulunamadı');
    const data: any = { ...dto };
    if (dto.birthDate) data.birthDate = new Date(dto.birthDate);
    return this.prisma.student.update({ where: { id }, data });
  }

  async remove(centerId: string, id: string) {
    const student = await this.prisma.student.findFirst({ where: { id, centerId } });
    if (!student) throw new NotFoundException('Öğrenci bulunamadı');
    return this.prisma.student.delete({ where: { id } });
  }
}
