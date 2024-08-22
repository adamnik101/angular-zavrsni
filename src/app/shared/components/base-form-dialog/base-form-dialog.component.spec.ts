import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormDialogComponent } from './base-form-dialog.component';

describe('BaseFormDialogComponent', () => {
  let component: BaseFormDialogComponent;
  let fixture: ComponentFixture<BaseFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
