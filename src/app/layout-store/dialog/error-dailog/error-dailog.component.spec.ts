import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDailogComponent } from './error-dailog.component';

describe('ErrorDailogComponent', () => {
  let component: ErrorDailogComponent;
  let fixture: ComponentFixture<ErrorDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
