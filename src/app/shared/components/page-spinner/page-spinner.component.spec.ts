import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSpinnerComponent } from './page-spinner.component';

describe('PageSpinnerComponent', () => {
  let component: PageSpinnerComponent;
  let fixture: ComponentFixture<PageSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
