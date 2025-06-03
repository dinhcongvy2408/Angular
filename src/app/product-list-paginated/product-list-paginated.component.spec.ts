import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPaginatedComponent } from './product-list-paginated.component';

describe('ProductListPaginatedComponent', () => {
  let component: ProductListPaginatedComponent;
  let fixture: ComponentFixture<ProductListPaginatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListPaginatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListPaginatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
