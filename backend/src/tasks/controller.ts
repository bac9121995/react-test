import { Body, Controller, Post, ValidationPipe, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/request.dto';
import { TasksService } from './service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ description: 'Create' })
  @Post('create')
  async createTask(@Body(new ValidationPipe()) dto: CreateTaskDto) {
    return await this.tasksService.createTask(dto);
  }

  @ApiOperation({ description: 'Update' })
  @Post('update')
  async updateTask(@Body() dto: any) {
    return await this.tasksService.updateTask(dto);
  }

  @ApiOperation({ description: 'Get' })
  @Get('')
  async findAll() {
    return await this.tasksService.findAll();
  }
}
