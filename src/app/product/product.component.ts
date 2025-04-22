import { Component, OnInit } from '@angular/core';
import { ApiService } from '../CallApI/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  groups: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getGroups().subscribe(data => {
      this.groups = data;
      console.log(this.groups);
    });
  }

  addBigGroup() {
    const newGroup = {
      
        "id": "4",
        "name": "Sữa cho người lớn",
        "href": "#",
        "options": [
          {
            "name": "Sữa cho mẹ bầu",
            "href": "https://cellphones.com.vn/cart/success/cos"
          },
          {
            "name": "Sữa người cao tuổi",
            "href": "https://cellphones.com.vn/cart/success/cos"
          },
          {
            "name": "Sữa người bệnh",
            "href": "https://cellphones.com.vn/cart/success/cos"
          },
          {
            "name": "Xem tất cả",
            "href": "https://cellphones.com.vn/cart/success/cos"
          }
        ],
        "images": [
          {
            "href": "https://cellphones.com.vn/",
            "src": "https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/product_3_vendor_1.jpg?1744280977016",
            "alt": "Ảnh 1"
          },
          {
            "href": "https://cellphones.com.vn/",
            "src": "//bizweb.dktcdn.net/100/416/540/themes/839121/assets/product_1_vendor_2.jpg?1744084012349",
            "alt": "Ảnh 2"
          },
          {
            "href": "https://cellphones.com.vn/",
            "src": "https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/product_3_vendor_2.jpg?1744280977016",
            "alt": "Ảnh 2"
          },
          {
            "href": "https://cellphones.com.vn/",
            "src": "//bizweb.dktcdn.net/100/416/540/themes/839121/assets/product_1_vendor_4.jpg?1744280977016",
            "alt": "Ảnh 2"
          },
          {
            "href": "https://cellphones.com.vn/",
            "src": "https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/product_1_vendor_10.jpg?1744280977016",
            "alt": "Ảnh 2"
          },
          {
            "href": "https://cellphones.com.vn/",
            "src": "https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/product_3_vendor_5.jpg?1744280977016",
            "alt": "Ảnh 2"
          },
          {
            "href": "https://cellphones.com.vn/",
            "src": "https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/product_3_vendor_6.jpg?1744280977016",
            "alt": "Ảnh 2"
          },
          {
            "href": "https://cellphones.com.vn/",
            "src": "https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/product_3_vendor_7.jpg?1744280977016",
            "alt": "Ảnh 2"
          },
          {
            "href": "https://cellphones.com.vn/",
            "src": "//bizweb.dktcdn.net/100/416/540/themes/839121/assets/product_1_vendor_2.jpg?1744084012349",
            "alt": "Ảnh 2"
          },
          {
            "href": "https://cellphones.com.vn/",
            "src": "//bizweb.dktcdn.net/100/416/540/themes/839121/assets/product_1_vendor_2.jpg?1744084012349",
            "alt": "Ảnh 2"
          }
        ],
        "baner": [
          {
            "href": "https://cellphones.com.vn/smember/order",
            "src": "https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/img_product_banner_3.jpg?1744280977016",
            "alt": "Ảnh banner"
          }
        ],
        "products": [
          {
            "id": 1,
            "name": "Rontamil Nutri-pro K id 400g",
            "price": 25000,
            "images": "https://bizweb.dktcdn.net/100/416/540/products/nan-expert-380g-1a2d8cb2-c9be-462e-9d9b-eadba9526e5c.jpg?v=1694068865303"
          },
          {
            "id": 2,
            "name": "Rontamil Nutri-pro K id 800g",
            "price": 27000,
            "images": "https://bizweb.dktcdn.net/100/416/540/products/bim-2-400g.png?v=1730880763777"
          },
          {
            "id": 3,
            "name": "Rontamil Nutri-pro K id 800g",
            "price": 23000,
            "images": "https://bizweb.dktcdn.net/100/416/540/products/nan-expert-380g-1a2d8cb2-c9be-462e-9d9b-eadba9526e5c.jpg?v=1694068865303"
          },
          {
            "id": 4,
            "name": "Rontamil Nutri-pro K id 800g",
            "price": 26000,
            "images": "https://bizweb.dktcdn.net/100/416/540/products/ron2-800.jpg?v=1694056671980"
          },
          {
            "id": 5,
            "name": "Rontamil Nutri-pro kk id 800g",
            "price": 23000,
            "images": "https://bizweb.dktcdn.net/100/416/540/products/nan-expert-380g-1a2d8cb2-c9be-462e-9d9b-eadba9526e5c.jpg?v=1694068865303"
          },
          {
            "id": 6,
            "name": "Rontamil Nutri-pro K id 800g",
            "price": 26000,
            "images": "https://bizweb.dktcdn.net/100/416/540/products/bim-2-900.png?v=1730880625237"
          }
        ]
      
      
    };    
    this.apiService.addGroup(newGroup).subscribe(response => {
      this.groups.push(response);
      console.log('Đã thêm nhóm mới:', response);
    });
  }
}
