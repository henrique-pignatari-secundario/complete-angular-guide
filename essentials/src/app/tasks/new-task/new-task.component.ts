import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { TasksService } from '../../core/services/tasks.service';
import { Subject, switchMap, tap } from 'rxjs';
import { NewTaskFormData } from '../../core/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private readonly tasksService = inject(TasksService);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter<void>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    const subscription = this.tasksService
      .addTask(
        {
          title: this.enteredTitle,
          summary: this.enteredSummary,
          date: this.enteredDate,
        },
        this.userId
      )
      .subscribe(() => this.close.emit());

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
