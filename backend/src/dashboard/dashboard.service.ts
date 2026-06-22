import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(centerId: string) {
    const [
      totalStudents,
      activeStudents,
      totalCourses,
      activeCourses,
      totalDiveLogs,
      totalEquipment,
      equipmentNeedsService,
      courseRevenue,
      recentDives,
      upcomingCourses,
    ] = await Promise.all([
      this.prisma.student.count({ where: { centerId } }),
      this.prisma.student.count({ where: { centerId, status: 'active' } }),
      this.prisma.course.count({ where: { centerId } }),
      this.prisma.course.count({ where: { centerId, status: { in: ['scheduled', 'in_progress'] } } }),
      this.prisma.diveLog.count({ where: { centerId } }),
      this.prisma.equipment.count({ where: { centerId } }),
      this.prisma.equipment.count({ where: { centerId, condition: { in: ['needs_service', 'out_of_service'] } } }),
      this.prisma.course.aggregate({ where: { centerId, status: { in: ['completed', 'in_progress'] } }, _sum: { price: true } }),
      this.prisma.diveLog.findMany({
        where: { centerId },
        orderBy: { diveDate: 'desc' },
        take: 5,
        include: { student: { select: { firstName: true, lastName: true } } },
      }),
      this.prisma.course.findMany({
        where: { centerId, status: { in: ['scheduled', 'in_progress'] } },
        orderBy: { startDate: 'asc' },
        take: 5,
        include: { _count: { select: { enrollments: true } } },
      }),
    ]);

    return {
      totalStudents,
      activeStudents,
      totalCourses,
      activeCourses,
      totalDiveLogs,
      totalEquipment,
      equipmentNeedsService,
      totalRevenue: courseRevenue._sum.price || 0,
      recentDives,
      upcomingCourses,
    };
  }
}
