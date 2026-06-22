import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

enum Visibility { poor = 'poor', fair = 'fair', good = 'good', excellent = 'excellent' }

export class UpdateDiveLogDto {
  @IsOptional()
  @IsNumber()
  diveNumber?: number;

  @IsOptional()
  @IsString()
  diveSite?: string;

  @IsOptional()
  @IsString()
  diveDate?: string;

  @IsOptional()
  @IsNumber()
  maxDepth?: number;

  @IsOptional()
  @IsNumber()
  duration?: number;

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
