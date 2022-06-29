import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[InputNumberFormat]'
})
export class InputNumberFormatDirective {
  private el: HTMLInputElement

  constructor(elementRef: ElementRef) {
    this.el = elementRef.nativeElement
  }

  @HostListener("keypress", ["$event"])
  onKeypress(event: any) {
    let isNumeric = event.charCode >= 48 && event.charCode <= 57;
    if (!isNumeric)
      event.preventDefault();
  }
}
