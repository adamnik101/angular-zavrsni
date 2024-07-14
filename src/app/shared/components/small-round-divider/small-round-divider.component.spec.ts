import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallRoundDividerComponent } from './small-round-divider.component';

describe('SmallRoundDividerComponent', () => {
  let component: SmallRoundDividerComponent;
  let fixture: ComponentFixture<SmallRoundDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallRoundDividerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallRoundDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
