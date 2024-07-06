import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLinkItemComponent } from './navigation-link-item.component';

describe('NavigationLinkItemComponent', () => {
  let component: NavigationLinkItemComponent;
  let fixture: ComponentFixture<NavigationLinkItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationLinkItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationLinkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
