import { Component, inject, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  private readonly tasksService = inject(TasksService);

  onCompleteTask() {
    this.tasksService.removeTask(this.task.id);
  }
}
