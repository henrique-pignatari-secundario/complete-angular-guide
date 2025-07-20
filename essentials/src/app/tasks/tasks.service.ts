import { Injectable } from '@angular/core';
import { DUMMY_TASKS } from '../dummy-tasks';
import { NewTaskData, Task } from './task/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private static TASKS_STORAGE_KEY = 'tasks';
  private tasks: Task[] = DUMMY_TASKS;

  constructor() {
    const tasks = localStorage.getItem(TasksService.TASKS_STORAGE_KEY);
    if (tasks) this.tasks = JSON.parse(tasks);
  }

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem(
      TasksService.TASKS_STORAGE_KEY,
      JSON.stringify(this.tasks)
    );
  }
}
