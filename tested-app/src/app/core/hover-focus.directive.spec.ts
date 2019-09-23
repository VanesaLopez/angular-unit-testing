import { HoverFocusDirective } from './hover-focus.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" appHoverFocus>`
})
class TestHoverFocusComponent {
}

describe('HoverFocusDirective', () => {
  let component: TestHoverFocusComponent;
  let fixture: ComponentFixture<TestHoverFocusComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [TestHoverFocusComponent, HoverFocusDirective]
    });
    fixture = TestBed.createComponent(TestHoverFocusComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
});

  it('should create an instance', () => {
    const directive = new HoverFocusDirective();
    expect(directive).toBeTruthy();
  });

  it('hovering over input', () => {
    inputEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('yellow');

    inputEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('');
});
});
