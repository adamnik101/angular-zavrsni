import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAlbumsComponent } from './add-edit-albums.component';

describe('AddEditAlbumsComponent', () => {
  let component: AddEditAlbumsComponent;
  let fixture: ComponentFixture<AddEditAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAlbumsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
