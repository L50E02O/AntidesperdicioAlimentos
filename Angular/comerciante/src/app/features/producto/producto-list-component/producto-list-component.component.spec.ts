import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoListComponentComponent } from './producto-list-component.component';

describe('ProductoListComponentComponent', () => {
  let component: ProductoListComponentComponent;
  let fixture: ComponentFixture<ProductoListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
