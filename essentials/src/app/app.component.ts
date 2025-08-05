import { Component, OnInit } from '@angular/core';
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
  users$!: Observable<User[]>;
  selectedUser?: User;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  ngOnInit(): void {
    this.users$ = this.usersService.getAllUsers();
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
  }
}
