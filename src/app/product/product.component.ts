import { Component, OnInit } from '@angular/core';
import { ApiService } from '../CallApI/api.service';
import { CartService } from '../services/cart.service';
import { Group, Banner, Option, Image, Product, PaginationResponse } from '../models/interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  groups: Group[] = [];
  banners: Banner[] = [];
  options: Option[] = [];
  images: Image[] = [];
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;

  // Thông tin phân trang
  currentPage: number = 0; // Trang hiện tại (bắt đầu từ 0)
  pageSize: number = 10; // Số lượng sản phẩm trên mỗi trang
  totalItems: number = 0; // Tổng số sản phẩm
  totalPages: number = 0; // Tổng số trang

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadBanners();
    this.loadOptions();
    this.loadImages();
    this.loadGroups();
    this.loadProducts(); // Tải sản phẩm với phân trang
  }

  loadGroups(): void {
    this.apiService.getGroups().subscribe({
      next: (data: Group[]) => {
        this.groups = data;
      },
      error: (error: Error) => {
        console.error('Lỗi khi tải groups:', error);
      }
    });
  }

  loadBanners(): void {
    this.apiService.getBanners().subscribe({
      next: (data: Banner[]) => {
        this.banners = data;
      },
      error: (error: Error) => {
        console.error('Lỗi khi tải banner:', error);
      }
    });
  }

  loadOptions(): void {
    this.apiService.getOptions().subscribe({
      next: (data: Option[]) => {
        this.options = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      error: (error: Error) => {
        console.error('Lỗi khi tải options:', error);
      }
    });
  }

  loadImages(): void {
    this.apiService.getImages().subscribe({
      next: (data: Image[]) => {
        this.images = data;
      },
      error: (error: Error) => {
        console.error('Lỗi khi tải images:', error);
      }
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.apiService.getProductsPaginated(this.currentPage, this.pageSize).subscribe({
      next: (response: PaginationResponse<Product>) => {
        this.groups.forEach(group => {
          const groupProducts = this.products.filter(product => 
            product.group && product.group.id === group.id
          );
          group.products = groupProducts;
        });
      },
      error: (error) => {
        this.error = 'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.';
        this.loading = false;
        console.error('Lỗi khi tải sản phẩm phân trang:', error);
        this.products = [];
      }
    });
  }
  getImagesByGroup(groupId: number): Image[] {
  return this.images.filter(img => img.group?.id === groupId);
}

}
