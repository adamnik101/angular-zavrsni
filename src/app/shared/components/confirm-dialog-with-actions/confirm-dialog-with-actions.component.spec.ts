import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogWithActionsComponent } from './confirm-dialog-with-actions.component';

describe('ConfirmDialogWithActionsComponent', () => {
  let component: ConfirmDialogWithActionsComponent;
  let fixture: ComponentFixture<ConfirmDialogWithActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogWithActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogWithActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
