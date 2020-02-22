import { Pipe } from '@angular/core';
import { SharedState, MODES } from './sharedState.model';
import { Model } from '../model/repository.model';

// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({
  name: 'formatState',
  pure: true
})
export class StatePipe {
  constructor(private model: Model) {}

  transform(value: any): string {
    if (value instanceof SharedState) {
      let state = value as SharedState;
      return (
        MODES[state.mode] +
        (state.id !== undefined
          ? ` ${this.model.getProduct(state.id).name}`
          : '')
      );
    } else {
      return '<No Data>';
    }
  }
}
