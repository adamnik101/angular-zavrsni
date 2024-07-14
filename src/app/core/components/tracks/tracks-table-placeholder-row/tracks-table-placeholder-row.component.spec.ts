import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksTablePlaceholderRowComponent } from './tracks-table-placeholder-row.component';

describe('TracksTablePlaceholderRowComponent', () => {
  let component: TracksTablePlaceholderRowComponent;
  let fixture: ComponentFixture<TracksTablePlaceholderRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksTablePlaceholderRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksTablePlaceholderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
