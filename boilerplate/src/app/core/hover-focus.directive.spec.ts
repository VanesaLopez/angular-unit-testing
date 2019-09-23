import { HoverFocusDirective } from './hover-focus.directive';

describe('OnlyNumberDirective', () => {
  it('Montamos la directiva', () => {
    const directive = new HoverFocusDirective();
    expect(directive).toBeTruthy();
  });
});
