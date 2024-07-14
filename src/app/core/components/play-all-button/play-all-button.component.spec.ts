import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayAllButtonComponent } from './play-all-button.component';

describe('PlayAllButtonComponent', () => {
  let component: PlayAllButtonComponent;
  let fixture: ComponentFixture<PlayAllButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayAllButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayAllButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
