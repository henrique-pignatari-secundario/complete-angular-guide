import { Inject, Injectable } from '@angular/core';
import { BASE_HTTP_CLIENT_TOKEN, BaseHttpClient } from '../http/baseHttpClient';
import { User } from '../models/user.model';
import { map, Observable } from 'rxjs';
import { UserResponseDto } from '../dtos/userResponseDto';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly basePath = '/users';
  private readonly httpClient: BaseHttpClient;

  public constructor(
    @Inject(BASE_HTTP_CLIENT_TOKEN) httpClient: BaseHttpClient
  ) {
    this.httpClient = httpClient;
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<UserResponseDto[]>(this.basePath).pipe(
      map((dtos) =>
        dtos.map((dto) => {
          return {
            id: dto.id,
            name: dto.name,
            avatar: dto.avatar,
          } as User;
        })
      )
    );
  }
}
