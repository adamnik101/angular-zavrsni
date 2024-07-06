import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonRadioButtonComponent } from './common-radio-button.component';

describe('CommonRadioButtonComponent', () => {
  let component: CommonRadioButtonComponent;
  let fixture: ComponentFixture<CommonRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonRadioButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
