import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueTrackItemComponent } from './queue-track-item.component';

describe('QueueTrackItemComponent', () => {
  let component: QueueTrackItemComponent;
  let fixture: ComponentFixture<QueueTrackItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueueTrackItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueTrackItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
