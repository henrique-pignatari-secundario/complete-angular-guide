import { Inject, Injectable } from '@angular/core';
import { BASE_HTTP_CLIENT_TOKEN, BaseHttpClient } from '../http/baseHttpClient';
import { map, Observable } from 'rxjs';
import { NewTaskFormData, Task } from '../models/task.model';
import { TaskResponseDto } from '../dtos/taskResponseDto';
import { TaskCreateRequestDto } from '../dtos/taskCreateRequestDto';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly basePath = '/tasks';
  private readonly httpClient: BaseHttpClient;

  constructor(@Inject(BASE_HTTP_CLIENT_TOKEN) httpClient: BaseHttpClient) {
    this.httpClient = httpClient;
  }

  public getTasksByUserId(userId: string): Observable<Task[]> {
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
        )
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
        )
      );
  }

  completeTask(id: string) {
    throw new Error('Method not implemented.');
  }
}
