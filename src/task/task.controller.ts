import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from '@prisma/client';

@Controller('tasks')
export class TaskController{
  
  constructor(private readonly taskService: TaskService){}

  @Get()
  async getAllTask(){
    return this.taskService.getAllTasks();
  }

  @Post()
  async createTask(@Body() data: Task){
    return this.taskService.createTask(data);
  }

  @Get(':id')
  async getTaskById(@Param('id') id:String){
    const taskFound = await this.taskService.getTaskById(Number(id));
    if(!taskFound) throw new NotFoundException("No se ha encontrado la tarea");
    return taskFound;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id:String){
    try {
      return await this.taskService.deleteTask(Number(id));
    } catch (error) {
      throw new NotFoundException(`El ID: ${id} de la tarea ingresada no existe`);
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id:String, @Body() data: Task){
    try {
      return await this.taskService.updateTask(Number(id), data);
    } catch (error) {
      throw new NotFoundException(`No se encontró una tarea con este ID: ${id}`);
    }
  }





}