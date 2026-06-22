import { IsString, IsNumber, IsOptional, IsBoolean, IsEnum } from 'class-validator';

enum EquipmentType { bcd = 'bcd', regulator = 'regulator', wetsuit = 'wetsuit', drysuit = 'drysuit', mask = 'mask', fins = 'fins', tank = 'tank', computer = 'computer', torch = 'torch', camera = 'camera', weight_belt = 'weight_belt', snorkel = 'snorkel' }

export class CreateEquipmentDto {
  @IsString()
  name: string;

  @IsEnum(EquipmentType)
  equipmentType: EquipmentType;

  @IsOptional()
  @IsString()
  serialNumber?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  purchaseDate?: string;

  @IsOptional()
  @IsString()
  lastServiceDate?: string;

  @IsOptional()
  @IsString()
  nextServiceDate?: string;

  @IsOptional()
  @IsBoolean()
  isRental?: boolean;

  @IsOptional()
  @IsNumber()
  dailyRate?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
