import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSmallRowItemComponent } from './album-small-row-item.component';

describe('AlbumSmallRowItemComponent', () => {
  let component: AlbumSmallRowItemComponent;
  let fixture: ComponentFixture<AlbumSmallRowItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumSmallRowItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumSmallRowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
