import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { MODES, SharedState, SHARED_STATE } from './sharedState.model';
import { Observable } from 'rxjs';
import { filter, map, distinctUntilChanged, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'paForm',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent {
  product: Product = new Product();
  // tslint:disable-next-line: no-inferrable-types
  editing: boolean = false;

  constructor(
    private model: Model,
    @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>
  ) {
    stateEvents
    // .pipe(map(state => state.mode === MODES.EDIT ? state.id : -1))
    // .pipe(distinctUntilChanged())
    .subscribe(update => {
      this.editing = update.id !== undefined && update.id !== -1;
      this.product = new Product();
      if (this.editing) {
        Object.assign(this.product, this.model.getProduct(update.id));
      }

    });
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.model.saveProduct(this.product);
      this.product = new Product();
      form.reset();
    }
  }

  resetForm() {
    this.product = new Product();
  }

  // ngDoCheck(): void {
  //   // Called every time that the input properties of a component or a directive are checked.
  //   // Use it to extend change detection by performing a custom check.
  //   // Add 'implements DoCheck' to the class.
  //   if (this.lastId !== this.state.id) {
  //     this.product = new Product();
  //     if (this.state.mode === MODES.EDIT) {
  //       Object.assign(this.product, this.model.getProduct(this.state.id));
  //     }
  //     this.lastId = this.state.id;
  //   }
  // }
}
