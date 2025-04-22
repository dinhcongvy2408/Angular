import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-left',
  templateUrl: './product-left.component.html',
  styleUrls: ['./product-left.component.scss']
})
export class ProductLeftComponent implements OnInit {
  @Input() groups: any;
  @Input() baner: any;
  @Input() even: any;


  ngOnInit() {
  }
}
