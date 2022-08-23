import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { icons } from '../../assets';

const CACHE: Record<string, SafeHtml> = {};

@Component({
  selector: 'app-svg-icon',
  template: '',
  styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent implements OnChanges {
  @Input() public icon?: string;
  @HostBinding('innerHTML') public html?: SafeHtml;

  public constructor(private sanitizer: DomSanitizer) {}

  public ngOnChanges(changes: SimpleChanges) {
    if ('icon' in changes) {
      this.html = this.icon !== undefined ? this.getIcon(this.icon) : undefined;
    }
  }

  private getIcon(value: string) {
    return (
      CACHE[value] ??
      (CACHE[value] = this.sanitizer.bypassSecurityTrustHtml(icons[value]))
    );
  }
}
