import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { CenterModule } from './center/center.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { DiveLogsModule } from './divelogs/divelogs.module';
import { EquipmentModule } from './equipment/equipment.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    AuthModule,
    CenterModule,
    StudentsModule,
    CoursesModule,
    DiveLogsModule,
    EquipmentModule,
    DashboardModule,
  ],
})
export class AppModule {}
