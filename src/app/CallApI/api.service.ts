import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Banner, Option, Image, Product, Group, PaginationResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';
  private groupsUrl = 'http://localhost:8080/api/groups';
  private productsUrl = 'http://localhost:8080/api/products';
  private bannerUrl = 'http://localhost:8080/api/banners';
  private optionsUrl = 'http://localhost:8080/api/options';
  private imagesUrl = 'http://localhost:8080/api/images';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Đã xảy ra lỗi!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      errorMessage = `Mã lỗi: ${error.status}, Thông báo: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Lấy danh sách sản phẩm
  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.productsUrl).pipe(
      map(response => {
        let products: Product[] = [];

        if (Array.isArray(response)) {
          products = response;
        } else if (response && response.products && Array.isArray(response.products)) {
          products = response.products;
        } else {
          console.warn('Dữ liệu sản phẩm không đúng định dạng:', response);
          return [];
        }

        return products;
      }),
      catchError(this.handleError)
    );
  }

  // Lấy danh sách banner
  getBanners(): Observable<Banner[]> {
    return this.http.get<any>(this.bannerUrl).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        } else if (response && response.banners && Array.isArray(response.banners)) {
          return response.banners;
        } else {
          console.warn('Dữ liệu banner không đúng định dạng:', response);
          return [];
        }
      })
    );
  }

  // Lấy danh sách options
  getOptions(): Observable<Option[]> {
    return this.http.get<any>(this.optionsUrl).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        } else if (response && response.options && Array.isArray(response.options)) {
          return response.options;
        } else {
          console.warn('Dữ liệu options không đúng định dạng:', response);
          return [];
        }
      })
    );
  }

  // Lấy danh sách images
  getImages(): Observable<Image[]> {
    return this.http.get<any>(this.imagesUrl).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        } else if (response && response.images && Array.isArray(response.images)) {
          return response.images;
        } else {
          console.warn('Dữ liệu images không đúng định dạng:', response);
          return [];
        }
      })
    );
  }

  // Lấy sản phẩm theo ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  // Thêm sản phẩm mới
  createProduct(productData: Product, imageFile: File): Observable<Product> {
    const formData = new FormData();
    formData.append('product', JSON.stringify(productData));
    formData.append('image', imageFile);
    return this.http.post<Product>(this.productsUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Cập nhật sản phẩm
  updateProduct(id: number, productData: Product, imageFile?: File): Observable<Product> {
    const formData = new FormData();
    formData.append('product', JSON.stringify(productData));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.put<Product>(`${this.productsUrl}/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Xóa sản phẩm
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Lấy danh sách nhóm sản phẩm
  getGroups(): Observable<Group[]> {
    return this.http.get<any>(this.groupsUrl).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        } else if (response && response.groups && Array.isArray(response.groups)) {
          return response.groups;
        } else {
          console.warn('Dữ liệu nhóm không đúng định dạng:', response);
          return [];
        }
      })
    );
  }

  getProductsByGroupId(groupId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}?groupId=${groupId}`);
  }

  // Lấy danh sách sản phẩm theo phân trang
  getProductsPaginated(page: number, size: number, sort?: string): Observable<PaginationResponse<Product>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PaginationResponse<Product>>(`${this.productsUrl}/paginated`, { params }).pipe(
      catchError(this.handleError)
    );
  }
}


