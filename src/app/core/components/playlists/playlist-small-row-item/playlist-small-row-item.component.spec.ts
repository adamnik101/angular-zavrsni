import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSmallRowItemComponent } from './playlist-small-row-item.component';

describe('PlaylistSmallRowItemComponent', () => {
  let component: PlaylistSmallRowItemComponent;
  let fixture: ComponentFixture<PlaylistSmallRowItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistSmallRowItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistSmallRowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
