import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TasksService } from '../../core/services/tasks.service';
import { Subject, switchMap, tap } from 'rxjs';
import { NewTaskFormData } from '../../core/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter<void>();
  private readonly tasksService = inject(TasksService);
  private submitSubject = new Subject<NewTaskFormData>();

  submitResult$ = this.submitSubject.pipe(
    switchMap((taskData) => this.tasksService.addTask(taskData, this.userId)),
    tap(() => this.close.emit())
  );

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.submitSubject.next({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.enteredDate,
    });
  }
}
