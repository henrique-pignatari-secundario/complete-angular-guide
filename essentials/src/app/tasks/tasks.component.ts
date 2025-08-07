import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  Input,
} from '@angular/core';
import { TasksService } from '../core/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  userId = input.required<string>();
  @Input({ required: true }) name!: string;
  private readonly tasksService = inject(TasksService);
  private readonly destroyRef = inject(DestroyRef);
  tasks = this.tasksService.loadedTasks;
  isAddingTask: boolean = false;

  constructor() {
    effect(() => {
      const subscription = this.tasksService
        .getOpenTasksByUserId(this.userId())
        .subscribe();
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    });
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
