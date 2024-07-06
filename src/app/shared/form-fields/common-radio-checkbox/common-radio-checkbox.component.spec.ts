import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonRadioCheckboxComponent } from './common-radio-checkbox.component';

describe('CommonRadioCheckboxComponent', () => {
  let component: CommonRadioCheckboxComponent;
  let fixture: ComponentFixture<CommonRadioCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonRadioCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonRadioCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
