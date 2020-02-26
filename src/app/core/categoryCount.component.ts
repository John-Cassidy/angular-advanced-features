import {
    Component, KeyValueDiffer, KeyValueDiffers, ChangeDetectorRef, OnInit, DoCheck
} from '@angular/core';
import { Model } from '../model/repository.model';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'paCategoryCount',
    template: `<div class="bg-primary p-2 text-white">
                    There are {{count}} categories
               </div>`
})
export class CategoryCountComponent implements OnInit, DoCheck {
    private differ: KeyValueDiffer<any, any>;
    // tslint:disable-next-line: no-inferrable-types
    count: number = 0;

    constructor(private model: Model,
                private keyValueDiffers: KeyValueDiffers,
                private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        this.differ = this.keyValueDiffers
            .find(this.model.getProducts())
            .create();
    }

    ngDoCheck() {
        if (this.differ.diff(this.model.getProducts()) != null) {
            this.count = this.model.getProducts()
                .map(p => p.category)
                .filter((category, index, array) => array.indexOf(category) === index)
                .length;
        }
    }
}
