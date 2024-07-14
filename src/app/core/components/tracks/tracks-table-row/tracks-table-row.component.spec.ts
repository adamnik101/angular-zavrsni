import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksTableRowComponent } from './tracks-table-row.component';

describe('TracksTableRowComponent', () => {
  let component: TracksTableRowComponent;
  let fixture: ComponentFixture<TracksTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksTableRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
