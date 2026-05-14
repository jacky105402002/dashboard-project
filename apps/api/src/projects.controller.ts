import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('public')
  @ApiOkResponse({ description: 'Public project records ordered for the dashboard.' })
  async getPublicProjects() {
    return this.prisma.project.findMany({
      where: {
        isPublic: true,
      },
      orderBy: [
        { isFeatured: 'desc' },
        { sortOrder: 'asc' },
        { updatedAt: 'desc' },
      ],
    });
  }
}
