import { Component, HostListener, Output, EventEmitter } from '@angular/core';
import { Model } from '../model/repository.model';
import { Product } from '../model/product.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'first',
  templateUrl: 'first.component.html'
})
export class FirstComponent {
  // tslint:disable-next-line: no-inferrable-types
  category: string = 'Soccer';
  // tslint:disable-next-line: no-inferrable-types
  highlighted: boolean = false;

  // tslint:disable-next-line: no-output-rename
  @Output('pa-highlight')
  change = new EventEmitter<boolean>();

  constructor(private repository: Model) {}

  getProducts(): Product[] {
    return this.repository
      .getProducts()
      .filter(p => p.category === this.category);
  }

  @HostListener('mouseenter', ['$event.type'])
  @HostListener('mouseleave', ['$event.type'])
  setHighlight(type: string) {
    this.highlighted = type === 'mouseenter';
    this.change.emit(this.highlighted);
  }
}
