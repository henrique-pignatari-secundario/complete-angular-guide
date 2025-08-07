import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';
import { UserComponent } from './user/user.component';
import { BASE_HTTP_CLIENT_TOKEN } from './core/http/baseHttpClient';
import { NatvieBaseHttpClientImpl } from './core/http/nativeBaseHttpClientImpl';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent],
  imports: [BrowserModule, SharedModule, TasksModule],
  bootstrap: [AppComponent],
  providers: [
    provideHttpClient(),
    { provide: BASE_HTTP_CLIENT_TOKEN, useClass: NatvieBaseHttpClientImpl },
  ],
})
export class AppModule {}
