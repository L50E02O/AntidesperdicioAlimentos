import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditarProductoComponent } from './editar-producto.component';

fdescribe('EditarProductoComponent', () => {
  let component: EditarProductoComponent;
  let fixture: ComponentFixture<EditarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditarProductoComponent,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Simula los parámetros que tu componente espera
            params: of({ id: '123' }),
            snapshot: { paramMap: { get: () => '123' } }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});