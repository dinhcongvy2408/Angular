import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent {
  Baners = [
    { src: 'https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/slide-img5.jpg?1744280977016', alt: 'Baner 1' },
    { src: 'https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/slide-img4.jpg?1744280977016', alt: 'Baner 2' },
    { src: 'https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/slide-img2.jpg?1744280977016', alt: 'Baner 3' },];
    products= [
      { title: 'Tã dán M20', price: '149.000₫', img: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/lac800.png?v=1731656026840' },
      { title: 'Tã dán L20', price: '159.000₫', img: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/lac800.png?v=1731656026840' },
    ];
    Baner = [
      {
        title: 'Sữa bột Lacsure 400g',
        price: 398000,
        description: 'LACSURE 400g là sản phẩm của tập đoàn OPKO Health Hoa Kỳ. Được nhập khẩu...',
        src: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/na-gr.png?v=1729225407097'
      },
      {
        title: 'Sữa bột Lacsure 800g',
        price: 88000,
        description: 'LACSURE 800g là sản phẩm của tập đoàn OPKO Health Hoa Kỳ. Được nhập khẩu...',
        src: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/si-0-plus.png?v=1729135328817'
      },
      {
        title: 'Sữa bột Lacsure 800g',
        price: 78000,
        description: 'LACSURE 800g là sản phẩm của tập đoàn OPKO Health Hoa Kỳ. Được nhập khẩu...',
        src: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/confidence-classic-l20.jpg?v=1724293253847'
      },
      {
        title: 'Sữa bột Lacsure 800g',
        price: 9000,
        description: 'LACSURE 800g là sản phẩm của tập đoàn OPKO Health Hoa Kỳ. Được nhập khẩu...',
        src: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/confidence-classic-l20.jpg?v=1724293253847'
      },
      {
        title: 'Sữa bột Lacsure 800g',
        price: 8000,
        description: 'LACSURE 800g là sản phẩm của tập đoàn OPKO Health Hoa Kỳ. Được nhập khẩu...',
        src: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/confidence-slimfit-m16.jpg?v=1724293776750 '
      },
      {
        title: 'Sữa bột Lacsure 800g',
        price: 8000,
        description: 'LACSURE 800g là sản phẩm của tập đoàn OPKO Health Hoa Kỳ. Được nhập khẩu...',
        src: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/lac800.png?v=1731656026840'
      },
      {
        title: 'Sữa bột Lacsure 800g',
        price: 788000,
        description: 'LACSURE 800g là sản phẩm của tập đoàn OPKO Health Hoa Kỳ. Được nhập khẩu...',
        src: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/lac800.png?v=1731656026840'
      },
      {
        title: 'Sữa bột Lacsure 800g',
        price: 788000,
        description: 'LACSURE 800g là sản phẩm của tập đoàn OPKO Health Hoa Kỳ. Được nhập khẩu...',
        src: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/d3k1b.jpg?v=1722227172763'
      },
    ];
    chunkedBanners: {
      src: string;
      alt?: string;
      title?: string;
      price?: number;
      description?: string;
    }[][] = [];

    ngOnInit() {
      for (let i = 0; i < this.Baner.length; i += 2) {
        this.chunkedBanners.push(this.Baner.slice(i, i + 2));
      }
    }
}
