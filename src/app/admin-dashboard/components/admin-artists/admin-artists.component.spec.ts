import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtistsComponent } from './admin-artists.component';

describe('AdminArtistsComponent', () => {
  let component: AdminArtistsComponent;
  let fixture: ComponentFixture<AdminArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminArtistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
