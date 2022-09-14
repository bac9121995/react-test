import { Module } from '@nestjs/common';
import { QueryDatabaseModule } from '../database/query.database.module';
import { TasksController } from './controller';
import { TasksService } from './service';
import { TaskProviders } from './infra/providers';
import { TaskRepository } from './infra/repository';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [QueryDatabaseModule, ConfigModule],
  controllers: [TasksController],
  providers: [...TaskProviders, TaskRepository, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
