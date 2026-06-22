import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(centerId: string, params?: { page?: number; status?: string; courseType?: string }) {
    const page = params?.page || 1;
    const take = 20;
    const skip = (page - 1) * take;

    const where: any = { centerId };
    if (params?.status) where.status = params.status;
    if (params?.courseType) where.courseType = params.courseType;

    const [data, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip,
        take,
        orderBy: { startDate: 'desc' },
        include: { _count: { select: { enrollments: true } } },
      }),
      this.prisma.course.count({ where }),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / take) };
  }

  async create(centerId: string, dto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        centerId,
      },
    });
  }

  async update(centerId: string, id: string, dto: UpdateCourseDto) {
    const course = await this.prisma.course.findFirst({ where: { id, centerId } });
    if (!course) throw new NotFoundException('Kurs bulunamadı');
    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    return this.prisma.course.update({ where: { id }, data });
  }

  async remove(centerId: string, id: string) {
    const course = await this.prisma.course.findFirst({ where: { id, centerId } });
    if (!course) throw new NotFoundException('Kurs bulunamadı');
    return this.prisma.course.delete({ where: { id } });
  }
}
