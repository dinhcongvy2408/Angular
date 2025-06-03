import { Component, OnInit } from '@angular/core';
import { ApiService } from './CallApI/api.service';

interface GroupData {
  groups?: any[];
  [key: string]: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  groups: any[] = []; 
  

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getGroups().subscribe({
      next: (data: any[]) => {
        this.groups = data;
        console.log('Dữ liệu groups trong AppComponent:', this.groups);
      },
      error: (error) => {
        console.error('Lỗi khi tải dữ liệu trong AppComponent:', error);
        this.groups = [];
      }
    });
  }
}
