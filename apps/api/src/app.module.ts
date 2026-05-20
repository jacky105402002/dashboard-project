import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health.controller';
import { GithubSyncService } from './github-sync.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [HealthController, ProjectsController],
  providers: [PrismaService, GithubSyncService],
})
export class AppModule {}
