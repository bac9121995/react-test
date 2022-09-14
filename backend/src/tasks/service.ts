import { Injectable } from '@nestjs/common';
import { TaskRepository } from './infra/repository';

@Injectable()
export class TasksService {
  constructor(private readonly repository: TaskRepository) {}

  async createTask(dto: any) {
    return this.repository.create(dto);
  }

  async updateTask(dto: any) {
    const task = await this.repository.findOne({ id: dto.id });
    if (dto.status === task.status) {
      if (dto.index > task.index) {
        this.repository.update(
          { status: dto.status, index: { $gt: task.index, $lte: dto.index } },
          { $inc: { index: -1 } },
        );
      } else {
        this.repository.update(
          { status: dto.status, index: { $gte: dto.index, $lt: task.index } },
          { $inc: { index: 1 } },
        );
      }
    } else {
      this.repository.update(
        { status: task.status, index: { $gt: task.index } },
        { $inc: { index: -1 } },
      );
      this.repository.update(
        { status: dto.status, index: { $gte: dto.index } },
        { $inc: { index: 1 } },
      );
    }
    this.repository.update(
      { id: dto.id },
      { index: dto.index, status: dto.status },
    );

    return { success: true };
  }

  async findAll() {
    return this.repository.findAll();
  }
}
