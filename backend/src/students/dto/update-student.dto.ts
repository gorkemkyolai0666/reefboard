import { IsString, IsEmail, IsOptional, IsBoolean, IsEnum, IsNumber } from 'class-validator';

enum CertLevel { open_water = 'open_water', advanced_open_water = 'advanced_open_water', rescue_diver = 'rescue_diver', divemaster = 'divemaster', instructor = 'instructor', none = 'none' }
enum StudentStatus { active = 'active', graduated = 'graduated', inactive = 'inactive', suspended = 'suspended' }

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsEnum(CertLevel)
  certLevel?: CertLevel;

  @IsOptional()
  @IsString()
  certNumber?: string;

  @IsOptional()
  @IsBoolean()
  healthClearance?: boolean;

  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;

  @IsOptional()
  @IsNumber()
  totalDives?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
