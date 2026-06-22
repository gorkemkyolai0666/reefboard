import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

enum CourseType { open_water = 'open_water', advanced_open_water = 'advanced_open_water', rescue_diver = 'rescue_diver', divemaster = 'divemaster', specialty_nitrox = 'specialty_nitrox', specialty_deep = 'specialty_deep', specialty_wreck = 'specialty_wreck', specialty_night = 'specialty_night', specialty_underwater_photo = 'specialty_underwater_photo', first_aid = 'first_aid', try_dive = 'try_dive' }
enum CourseStatus { scheduled = 'scheduled', in_progress = 'in_progress', completed = 'completed', cancelled = 'cancelled' }

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(CourseType)
  courseType?: CourseType;

  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;

  @IsOptional()
  @IsString()
  instructorName?: string;

  @IsOptional()
  @IsNumber()
  maxParticipants?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
