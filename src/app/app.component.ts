import { Component, OnInit } from '@angular/core';
import { ApiService } from './CallApI/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  groups: any[] = []; 

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }
}
