import { ProjectStatus } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class ProjectDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsString()
  @MaxLength(120)
  slug!: string;

  @IsString()
  @MaxLength(280)
  summary!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ProjectStatus)
  status!: ProjectStatus;

  @IsString()
  @MaxLength(80)
  category!: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  githubUrl?: string | null;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  demoUrl?: string | null;

  @IsArray()
  @IsString({ each: true })
  techStack!: string[];

  @IsBoolean()
  isPublic!: boolean;

  @IsBoolean()
  isFeatured!: boolean;

  @IsInt()
  @Min(0)
  sortOrder!: number;

  @IsOptional()
  @IsDateString()
  lastUpdatedAt?: string | null;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(280)
  summary?: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  category?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  githubUrl?: string | null;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  demoUrl?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @IsOptional()
  @IsDateString()
  lastUpdatedAt?: string | null;
}
