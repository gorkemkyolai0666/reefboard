import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

enum Visibility { poor = 'poor', fair = 'fair', good = 'good', excellent = 'excellent' }

export class CreateDiveLogDto {
  @IsNumber()
  diveNumber: number;

  @IsString()
  studentId: string;

  @IsString()
  diveSite: string;

  @IsString()
  diveDate: string;

  @IsNumber()
  maxDepth: number;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsNumber()
  waterTemp?: number;

  @IsOptional()
  @IsEnum(Visibility)
  visibility?: Visibility;

  @IsOptional()
  @IsString()
  buddy?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
