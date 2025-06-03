import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';  
import { CartService } from '../services/cart.service';
import { Product } from '../models/interfaces';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  menu = [
    { name: 'Sản phẩm mới', href: '/' },
    { name: 'Sản phẩm hot', href: '/product-hot' },
    { name: 'Sản phẩm khuyến mãi', href: '/product-sale' },
    { name: 'Sản phẩm bán chạy', href: '/product-best' },
    { name: 'Sản phẩm giảm giá', href: '/product-discount' },
    { name: 'Sản phẩm sắp ra mắt', href: '/product-coming-soon' },
  ];
  menuOption = [
    {
      name: 'SỮA CHO MỌI NHÀ',
      Option: [
        { name: 'Sữa bột', href: '#' },
        { name: 'Sữa bột sinh học', href: '#' },
        { name: 'Sữa bột nhập khẩu', href: '#' },
        { name: 'Sữa bột pha SẵnSẵn', href: '#' },
        { name: 'Sữa bột cho mẹ bầu', href: '#' },
        { name: 'Sữa người cao tuổi', href: '#' },
        { name: 'Sữa tươii', href: '#' },
        { name: 'Sữa chua', href: '#' },
        { name: 'Sữa đặc & Sữa đậu nành', href: '#' },
      ]
    },
    {
      name: 'THỰC PHẨM DINH DƯỠNG',
      Option: [
        { name: 'Yến chưng sẵn', href: '#' },
        { name: 'Thực phẩm chức năng', href: '#' },
        { name: 'Thực phẩm bổ sung', href: '#' },
        { name: 'Ăn dặm cho bé', href: '#' },
        { name: 'Vắng sứa', href: '#' },
        { name: 'Phô Mai', href: '#' },
        { name: 'Nước Giải khát', href: '#' },
      ]
    },
    {
      name: 'TÃ & BỈM',
      Option: [
        { name: 'Tã Bỉm dán', href: '#' },
        { name: 'Tã Bỉm quần', href: '#' },
        { name: 'Tã bỉm người lớn', href: '#' },
        { name: 'Miếng lót', href: '#' },
      ]
    },
    {
      name: 'ĐỒ DÙNG CHO MẸ & BÉ',
      Option: [
        { name: 'Bình sữa', href: '#' },
        { name: 'Ti Ngậm - Ti giả', href: '#' },
        { name: 'Vệ sinh mẹ & bé', href: '#' },
        { name: 'Khăn ướt', href: '#' },
        { name: 'Chăm sóc da & tóc', href: '#' },
      ]
    },
    {
      name: 'HỆ THỐNG CỬA HÀNG',
    },
    {
      name: 'TIN TỨC',
    },
  ];

  isLoggedIn: boolean = false;
  userName: string = '';
  cartItems: Product[] = [];
  totalQuantity: number = 0;


  constructor(private authService: AuthService, private router: Router,private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalQuantity = this.cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userName = localStorage.getItem('userName') || '';

    if (this.isLoggedIn) {
      const user = this.authService.getUser();
      this.userName = user ? user.userName : '';
    }
  }
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
  logout(): void {
    this.authService.logout();
    localStorage.removeItem('userName');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
