import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSiderbarComponent } from './app-siderbar.component';

describe('AppSiderbarComponent', () => {
  let component: AppSiderbarComponent;
  let fixture: ComponentFixture<AppSiderbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSiderbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSiderbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
