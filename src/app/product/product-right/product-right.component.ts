import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../CallApI/api.service';
import { CartService } from '../../services/cart.service';
import { Product, Group, Banner, Image, Option } from '../../models/interfaces';

@Component({
  selector: 'app-product-right',
  templateUrl: './product-right.component.html',
  styleUrls: ['./product-right.component.scss']
})
export class ProductRightComponent implements OnInit, OnChanges {
  @Input() data: Product[] = [];
  @Input() groupId?: number;

  groups: Group[] = [];
  banners: Banner[] = [];
  images: Image[] = [];
  options: Option[] = [];

  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}


  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupId'] && changes['groupId'].currentValue !== undefined) {
      this.loadProducts();
    } else if (changes['data'] && changes['data'].currentValue) {
      this.products = changes['data'].currentValue;
    }
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    if (this.groupId !== undefined && this.groupId !== null) {
      this.apiService.getProductsByGroupId(this.groupId).subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.';
          this.loading = false;
          console.error('Lỗi khi tải sản phẩm:', error);
        }
      });
    } else {
      this.apiService.getProducts().subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.';
          this.loading = false;
          console.error('Lỗi khi tải sản phẩm:', error);
        }
      });
    }
  }
}
