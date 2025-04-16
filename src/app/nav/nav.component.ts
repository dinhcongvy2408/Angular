import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  menu = [{name:'Sản phẩm mới', href:'/'},
  {name:'Sản phẩm hot', href:'/product-hot'},
  {name:'Sản phẩm khuyến mãi', href:'/product-sale'},
  {name:'Sản phẩm bán chạy', href:'/product-best'},
  {name:'Sản phẩm giảm giá', href:'/product-discount'},
  {name:'Sản phẩm sắp ra mắt', href:'/product-coming-soon'},
  ];
  menuOption = [
    {
      name:'SỮA CHO MỌI NHÀ', 
      Option:[{name:'Sữa bột', href:'#'},
            {name:'Sữa bột sinh học', href:'#'},
            {name:'Sữa bột nhập khẩu', href:'#'},
            {name:'Sữa bột pha SẵnSẵn', href:'#'},
            {name:'Sữa bột cho mẹ bầu', href:'#'},
            {name:'Sữa người cao tuổi', href:'#'},
            {name:'Sữa tươii', href:'#'},
            {name:'Sữa chua', href:'#'},
            {name:'Sữa đặc & Sữa đậu nành', href:'#'},
          ]
    },
    {
      name:'THỰC PHẨM DINH DƯỠNG', 
      Option:[
        {name:'Yến chưng sẵn', href:'#'},
        {name:'Thực phẩm chức năng', href:'#'},
        {name:'Thực phẩm bổ sung', href:'#'},
        {name:'Ăn dặm cho bé', href:'#'},
        {name:'Vắng sứa', href:'#'},
        {name:'Phô Mai', href:'#'},
        {name:'Nước Giải khát', href:'#'},
        ]
    },
    {
      name:'TÃ & BỈM', 
      Option:[
        {name:'Tã Bỉm dán', href:'#'},
        {name:'Tã Bỉm quần', href:'#'},
        {name:'Tã bỉm người lớn', href:'#'},
        {name:'Miếng lót', href:'#'},
        ]
    },
    {
      name:'ĐỒ DÙNG CHO MẸ & BÉ', 
      Option:[
        {name:'Bình sữa', href:'#'},
        {name:'Ti Ngậm - Ti giả', href:'#'},
        {name:'Vệ sinh mẹ & bé', href:'#'},
        {name:'Khăn ướt', href:'#'},
        {name:'Chăm sóc da & tóc', href:'#'},
        ]
    },
    {
      name:'HỆ THỐNG CỬA HÀNG',},
    {
      name:'TIN TỨC', 
    },
  ]
}
