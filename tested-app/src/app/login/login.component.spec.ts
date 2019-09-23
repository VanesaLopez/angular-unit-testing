import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../core/authentication.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { User } from './user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [ AuthenticationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Setting enabled to false disabled the submit button', () => {
    let submitEl: DebugElement;

    submitEl = fixture.debugElement.query(By.css('button'));

    component.enabled = false;
    fixture.detectChanges();

    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('Setting enabled to true enables the submit button', () => {
    let submitEl: DebugElement;

    submitEl = fixture.debugElement.query(By.css('button'));

    component.enabled = true;
    fixture.detectChanges();

    expect(submitEl.nativeElement.disabled).toBeFalsy();
  });

  // Jasmine
  it('Entering email and password emits loggedIn event', (done) => {
    let user: User;
    let submitEl: DebugElement;
    const email = 'test@example.com';
    const password = '12345678';
    const service = TestBed.get(AuthenticationService);
    const spy = spyOn(service, 'login').and.returnValue(Promise.resolve(true));

    submitEl = fixture.debugElement.query(By.css('button'));

    component.form.controls['email'].setValue(email);
    component.form.controls['password'].setValue(password);
    expect(component.form.valid).toBeTruthy();

    // Subscribe to the Observable and store the user in a local variable.
    component.loggedIn.subscribe((value) => user = value);
    submitEl.triggerEventHandler('click', null);

    spy.calls.mostRecent().returnValue.then(() => {
      expect(user.email).toBe(email);
      expect(user.password).toBe(password);
      done();
    });

  });

  // Angular
  it('Entering email and password emits loggedIn event', async(() => {
    let user: User;
    let submitEl: DebugElement;
    const email = 'test@example.com';
    const password = '1234567878';
    const service = TestBed.get(AuthenticationService);
    spyOn(service, 'login').and.returnValue(Promise.resolve(true));

    submitEl = fixture.debugElement.query(By.css('button'));

    component.form.controls['email'].setValue(email);
    component.form.controls['password'].setValue(password);
    expect(component.form.valid).toBeTruthy();

    // Subscribe to the Observable and store the user in a local variable.
    component.loggedIn.subscribe((value) => user = value);

    // This sync emits the event and the subscribe callback gets executed above
    submitEl.triggerEventHandler('click', null);

    // Now we can check to make sure the emitted value is correct
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(user.email).toBe(email);
      expect(user.password).toBe(password);
    });
  }));

  it('Entering email and password emits loggedIn event', fakeAsync(() => {
    let user: User;
    let submitEl: DebugElement;
    const email = 'test@example.com';
    const password = '12345678';

    submitEl = fixture.debugElement.query(By.css('button'));

    component.form.controls['email'].setValue(email);
    component.form.controls['password'].setValue(password);
    expect(component.form.valid).toBeTruthy();

    // Subscribe to the Observable and store the user in a local variable.
    component.loggedIn.subscribe((value) => user = value);

    // This sync emits the event and the subscribe callback gets executed above
    submitEl.triggerEventHandler('click', null);
    tick();

    // Now we can check to make sure the emitted value is correct
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
}));

});
