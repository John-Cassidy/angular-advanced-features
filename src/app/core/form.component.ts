import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'paForm',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent {
  product: Product = new Product();
  // tslint:disable-next-line: no-inferrable-types
  editing: boolean = false;

  constructor(
    private model: Model, activeRoute: ActivatedRoute,
    private router: Router
    ) {

      // tslint:disable-next-line: no-string-literal
      this.editing = activeRoute.snapshot.params['mode'] === 'edit';

      // tslint:disable-next-line: no-string-literal
      let id = activeRoute.snapshot.params['id'];
      if (id != null) {
        // tslint:disable-next-line: no-string-literal
        let name = activeRoute.snapshot.params['name'];
        // tslint:disable-next-line: no-string-literal
        let category = activeRoute.snapshot.params['category'];
        // tslint:disable-next-line: no-string-literal
        let price = activeRoute.snapshot.params['price'];

        if (name != null && category != null && price != null) {
            this.product.id = id;
            this.product.name = name;
            this.product.category = category;
            this.product.price = Number.parseFloat(price);
        } else {
            Object.assign(this.product, model.getProduct(id) || new Product());
        }
    }
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.model.saveProduct(this.product);
      this.router.navigateByUrl('/');
    }
  }

  resetForm() {
    this.product = new Product();
  }

}
