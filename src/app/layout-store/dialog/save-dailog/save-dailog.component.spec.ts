import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDailogComponent } from './save-dailog.component';

describe('SaveDailogComponent', () => {
  let component: SaveDailogComponent;
  let fixture: ComponentFixture<SaveDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
