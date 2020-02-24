import { Component, Inject } from '@angular/core';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'paTable',
    templateUrl: 'table.component.html'
})
export class TableComponent {

    constructor(private model: Model) {

       }

    getProduct(key: number): Product {
        return this.model.getProduct(key);
    }

    getProducts(): Product[] {
        return this.model.getProducts();
    }

    deleteProduct(key: number) {
        this.model.deleteProduct(key);
    }
}
