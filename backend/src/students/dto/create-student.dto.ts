import { IsString, IsEmail, IsOptional, IsBoolean, IsEnum } from 'class-validator';

enum CertLevel { open_water = 'open_water', advanced_open_water = 'advanced_open_water', rescue_diver = 'rescue_diver', divemaster = 'divemaster', instructor = 'instructor', none = 'none' }

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

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
  @IsString()
  notes?: string;
}
