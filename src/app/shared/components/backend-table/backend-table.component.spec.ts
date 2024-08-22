import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendTableComponent } from './backend-table.component';

describe('BackendTableComponent', () => {
  let component: BackendTableComponent;
  let fixture: ComponentFixture<BackendTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackendTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
