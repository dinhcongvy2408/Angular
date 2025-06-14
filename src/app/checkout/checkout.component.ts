import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order, OrderItem, ShippingInfo } from '../models/order.interface';
import { Product } from '../models/interfaces';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  shippingInfo: ShippingInfo = {
    address: '',
    phoneNumber: '',
    note: ''
  };

  cartItems: Product[] = [];
  totalAmount: number = 0;
  isLoading: boolean = false;
  userId: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Lấy userId từ AuthService ngay khi component khởi tạo
    this.userId = this.authService.getUserId();
    if (this.userId === null) {
      console.warn('Không tìm thấy User ID. Có thể người dùng chưa đăng nhập hoặc token đã hết hạn.');
      this.errorMessage = 'Vui lòng đăng nhập để tiếp tục đặt hàng.';
    }

    // Lấy thông tin giỏ hàng từ CartService
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      error: (error) => {
        console.error('Lỗi khi lấy giỏ hàng:', error);
        this.errorMessage = 'Không thể lấy thông tin giỏ hàng. Vui lòng thử lại.';
      }
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.userId === null) {
      this.errorMessage = 'Không có thông tin người dùng. Vui lòng thử đăng nhập lại.';
      this.isLoading = false;
      return;
    }

    // Chuyển đổi cartItems thành OrderItem[]
    const orderItems: OrderItem[] = this.cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      productPrice: item.price
    }));

    const orderData: Order = {
      userId: this.userId,
      items: orderItems,
      totalAmount: this.totalAmount,
      shippingInfo: this.shippingInfo
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        // Xóa giỏ hàng thông qua CartService
        this.cartService.clearCart();
        this.successMessage = 'Đặt hàng thành công! Cảm ơn bạn đã mua hàng.';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        console.error('Lỗi khi đặt hàng:', error);
        this.errorMessage = error.error?.message || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!';
        this.isLoading = false;
      },
      complete: () => {
        // this.isLoading = false;
      }
    });
  }

  private validateForm(): boolean {
    if (!this.shippingInfo.address.trim()) {
      this.errorMessage = 'Vui lòng nhập địa chỉ giao hàng';
      return false;
    }
    if (!this.shippingInfo.phoneNumber.trim()) {
      this.errorMessage = 'Vui lòng nhập số điện thoại';
      return false;
    }
    if (!/^0[0-9]{9}$/.test(this.shippingInfo.phoneNumber)) {
      this.errorMessage = 'Số điện thoại không hợp lệ (phải bắt đầu bằng số 0 và có 10 chữ số)';
      return false;
    }
    if (this.cartItems.length === 0) {
      this.errorMessage = 'Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng.';
      return false;
    }
    return true;
  }
}