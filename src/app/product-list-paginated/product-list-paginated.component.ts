import { Component, OnInit } from '@angular/core';
import { ApiService } from '../CallApI/api.service';
import { Product, PaginationResponse } from '../models/interfaces';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list-paginated',
  templateUrl: './product-list-paginated.component.html',
  styleUrls: ['./product-list-paginated.component.scss']
})
export class ProductListPaginatedComponent implements OnInit {

  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;

  currentPage: number = 0; // Trang hiện tại 
  pageSize: number = 10; // Số lượng sản phẩm trên mỗi trang
  totalItems: number = 0; // Tổng số sản phẩm
  totalPages: number = 0; // Tổng số trang

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getProductsPaginated(this.currentPage, this.pageSize).subscribe({
      next: (response: PaginationResponse<Product>) => {
        this.products = response.content; 
        this.totalItems = response.totalElements; 
        this.totalPages = response.totalPages; 
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.';
        this.loading = false;
        console.error('Lỗi khi tải sản phẩm phân trang:', error);
        this.products = [];
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadProducts(); 
    }
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
