import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './core/models/user.model';
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly usersService: UsersService;
  private readonly destroyRef = inject(DestroyRef);
  users = signal<User[]>([]);
  selectedUser?: User;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  ngOnInit(): void {
    const subscription = this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
  }
}
