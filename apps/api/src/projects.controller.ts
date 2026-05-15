import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GithubSyncService } from './github-sync.service';
import { ProjectDto, UpdateProjectDto } from './project.dto';
import { PrismaService } from './prisma.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly githubSync: GithubSyncService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'All project records for the admin console.' })
  async getProjects() {
    return this.prisma.project.findMany({
      include: {
        events: {
          orderBy: { occurredAt: 'desc' },
          take: 8,
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { sortOrder: 'asc' },
        { updatedAt: 'desc' },
      ],
    });
  }

  @Get('public')
  @ApiOkResponse({ description: 'Public project records ordered for the dashboard.' })
  async getPublicProjects() {
    return this.prisma.project.findMany({
      where: {
        isPublic: true,
      },
      include: {
        events: {
          orderBy: { occurredAt: 'desc' },
          take: 5,
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { sortOrder: 'asc' },
        { updatedAt: 'desc' },
      ],
    });
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create a project record.' })
  async createProject(@Body() dto: ProjectDto) {
    return this.prisma.project.create({
      data: {
        ...dto,
        lastUpdatedAt: dto.lastUpdatedAt ? new Date(dto.lastUpdatedAt) : null,
      },
    });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Update a project record.' })
  async updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    await this.ensureProjectExists(id);

    return this.prisma.project.update({
      where: { id },
      data: {
        ...dto,
        lastUpdatedAt: dto.lastUpdatedAt === undefined ? undefined : dto.lastUpdatedAt ? new Date(dto.lastUpdatedAt) : null,
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete a project record.' })
  async deleteProject(@Param('id') id: string) {
    await this.ensureProjectExists(id);
    await this.prisma.project.delete({ where: { id } });

    return { id, deleted: true };
  }

  @Post(':id/sync-github')
  @ApiOkResponse({ description: 'Sync latest GitHub commits into project events.' })
  async syncGithub(@Param('id') id: string) {
    return this.githubSync.syncProjectCommits(id);
  }

  private async ensureProjectExists(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project ${id} was not found.`);
    }
  }
}
