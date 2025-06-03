import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Group, Banner, Option, Image } from '../../models/interfaces';

@Component({
  selector: 'app-product-left',
  templateUrl: './product-left.component.html',
  styleUrls: ['./product-left.component.scss']
})
export class ProductLeftComponent implements OnInit {
  @Input() groups!: Group;
  @Input() banners: Banner[] = [];
  @Input() options: Option[] = [];
  @Input() images: Image[] = [];
  @Input() even: boolean = false;


  
  isLargeScreen: boolean = false;
  
  @HostListener('window:resize', ['$event'])

  ngOnInit() {
    console.log('Groups received:', this.groups);
    console.log('Banners received:', this.banners);
    console.log('Options received:', this.options);
    console.log('Groups images:', this.images);
  }

}
