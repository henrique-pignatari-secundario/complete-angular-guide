import { Component, DestroyRef, inject, Input } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TasksService } from '../../core/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  private readonly tasksService = inject(TasksService);
  private readonly destroyRef = inject(DestroyRef);

  onCompleteTask() {
    const subscription = this.tasksService
      .completeTask(this.task.id, this.task.userId)
      .subscribe();

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
