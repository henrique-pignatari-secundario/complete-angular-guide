import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  // private interval?: ReturnType<typeof setInterval>;
  private destroyRef = inject(DestroyRef);
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');

  constructor() {
    effect((onCleanup) => {
      console.log(this.currentStatus());
      onCleanup(() => {
        console.log(
          'cleaning up effect, it runs before the actual effect function'
        );
      });
    });
  }

  ngOnInit() {
    const interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);
    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  // ngOnDestroy(): void {
  //   clearInterval(this.interval);
  // }
}
