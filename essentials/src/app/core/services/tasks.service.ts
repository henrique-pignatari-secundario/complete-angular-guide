import { Inject, Injectable, signal } from '@angular/core';
import { BASE_HTTP_CLIENT_TOKEN, BaseHttpClient } from '../http/baseHttpClient';
import { map, Observable, tap } from 'rxjs';
import { NewTaskFormData, Task } from '../models/task.model';
import { TaskResponseDto } from '../dtos/taskResponseDto';
import { TaskCreateRequestDto } from '../dtos/taskCreateRequestDto';
import { CompleteTaskRequestDto } from '../dtos/completeTaskRequestDto';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly basePath = '/tasks';
  private readonly httpClient: BaseHttpClient;

  public loadedTasks = signal<Task[]>([]);

  constructor(@Inject(BASE_HTTP_CLIENT_TOKEN) httpClient: BaseHttpClient) {
    this.httpClient = httpClient;
  }

  public getOpenTasksByUserId(userId: string): Observable<Task[]> {
    return this.httpClient
      .get<TaskResponseDto[]>(`${this.basePath}/by-user/${userId}`)
      .pipe(
        map((tasks) =>
          tasks.map(
            (task) =>
              ({
                id: task.id,
                userId: userId,
                title: task.title,
                summary: task.summary,
                dueDate: task.dueDate,
              } as Task)
          )
        ),
        tap({
          next: (responseData) => {
            this.loadedTasks.set(responseData);
          },
        })
      );
  }

  addTask(taskData: NewTaskFormData, userId: string): Observable<Task> {
    const dto: TaskCreateRequestDto = {
      userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    };
    return this.httpClient
      .post<TaskCreateRequestDto, TaskResponseDto>(`${this.basePath}`, dto)
      .pipe(
        map(
          (task) =>
            ({
              id: task.id,
              userId: userId,
              title: task.title,
              summary: task.summary,
              dueDate: task.dueDate,
            } as Task)
        ),
        tap({
          next: (task) => {
            this.loadedTasks.update((prev) => [...prev, task]);
          },
        })
      );
  }

  completeTask(id: string, userId: string) {
    return this.httpClient
      .patch<CompleteTaskRequestDto, TaskResponseDto>(
        `${this.basePath}/complete-task`,
        { userId, taskId: id }
      )
      .pipe(
        map(
          (task) =>
            ({
              id: task.id,
              userId: userId,
              title: task.title,
              summary: task.summary,
              dueDate: task.dueDate,
            } as Task)
        ),
        tap({
          next: () => {
            this.loadedTasks.set(
              this.loadedTasks().filter((task) => task.id !== id)
            );
          },
        })
      );
  }
}
