import { Module } from '@nestjs/common';
import { DiveLogsController } from './divelogs.controller';
import { DiveLogsService } from './divelogs.service';

@Module({
  controllers: [DiveLogsController],
  providers: [DiveLogsService],
})
export class DiveLogsModule {}
