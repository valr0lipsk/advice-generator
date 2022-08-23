import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { Advice, BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdviceComponent implements OnDestroy, OnInit {
  public advice: Advice | undefined;
  private readonly unsubscribe$$ = new Subject<void>();

  public constructor(
    private backend: BackendService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.backend
      .getAdvice$()
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((ad) => {
        this.advice = ad;
        this.cdr.detectChanges();
      });
  }

  public onClick(): void {
    this.backend
      .getAdvice$()
      .pipe(
        takeUntil(this.unsubscribe$$),
        tap((ad) => console.log(ad))
      )
      .subscribe((ad) => {
        this.advice = ad;
        this.cdr.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }
}
