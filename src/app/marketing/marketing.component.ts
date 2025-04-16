import { Component } from '@angular/core';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent {
  Baner = [
    { src: 'https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/slide-img5.jpg?1744280977016', alt: 'Baner 1' },
    { src: 'https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/slide-img4.jpg?1744280977016', alt: 'Baner 2' },
    { src: 'https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/slide-img2.jpg?1744280977016', alt: 'Baner 3' },];
    products = [
      { title: 'Tã dán M20', price: '149.000₫', img: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/lac800.png?v=1731656026840' },
      { title: 'Tã dán L20', price: '159.000₫', img: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/lac800.png?v=1731656026840' },
      { title: 'Tã quần XL', price: '169.000₫', img: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/lac800.png?v=1731656026840' },
      { title: 'Tã dán XXL', price: '179.000₫', img: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/lac800.png?v=1731656026840' },
      { title: 'Tã quần M', price: '139.000₫', img: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/lac800.png?v=1731656026840' },
      { title: 'Tã quần S', price: '129.000₫', img: 'https://bizweb.dktcdn.net/thumb/large/100/416/540/products/lac800.png?v=1731656026840' }
    ];
    
    get groupedProducts() {
      const result = [];
      for (let i = 0; i < this.products.length; i += 2) {
        result.push(this.products.slice(i, i + 2));
      }
      return result;
    }
}
