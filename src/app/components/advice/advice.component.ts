import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { Advice, BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss'],
})
export class AdviceComponent implements OnDestroy, OnInit {
  public advice!: Advice;
  private readonly unsubscribe$$ = new Subject<void>();

  public constructor(private backend: BackendService) {}

  public ngOnInit(): void {
    this.backend
      .getAdvice$()
      .pipe(
        takeUntil(this.unsubscribe$$),
        tap((ad) => console.log(ad))
      )
      .subscribe((ad) => (this.advice = ad));
  }

  public onClick(): void {
    this.backend
      .getAdvice$()
      .pipe(
        takeUntil(this.unsubscribe$$),
        tap((ad) => console.log(ad))
      )
      .subscribe((ad) => (this.advice = ad));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }
}
