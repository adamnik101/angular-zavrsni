import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSmallRowItemComponent } from './artist-small-row-item.component';

describe('ArtistSmallRowItemComponent', () => {
  let component: ArtistSmallRowItemComponent;
  let fixture: ComponentFixture<ArtistSmallRowItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistSmallRowItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistSmallRowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
