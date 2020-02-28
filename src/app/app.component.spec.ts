import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('Jasmine Test Environment', () => {
  it('is working', () => expect(true).toBe(true));
  it ('test numeric value', () => expect(12).toBeGreaterThan(10));
  it('test string value', () => expect('London').toMatch('^Lon'));
});
