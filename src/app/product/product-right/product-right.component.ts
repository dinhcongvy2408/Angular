import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-right',
  templateUrl: './product-right.component.html',
  styleUrls: ['./product-right.component.scss']
})
export class ProductRightComponent {
  @Input() data: any;
}
