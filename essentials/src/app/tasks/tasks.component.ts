import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../core/models/task.model';
import { TasksService } from '../core/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  private readonly tasksService = inject(TasksService);
  tasks$!: Observable<Task[]>;

  isAddingTask: boolean = false;

  ngOnInit(): void {
    this.tasks$ = this.tasksService.getTasksByUserId(this.userId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
