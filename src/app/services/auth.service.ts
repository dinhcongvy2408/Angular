import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, timeout } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse } from '../models/user.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private readonly TIMEOUT = 10000;

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable(); 

  constructor(private http: HttpClient, private cartService: CartService) {}

  register(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/users`, user, { headers });
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/log-in`, loginRequest)
      .pipe(
        timeout(this.TIMEOUT),
        tap(res => {
          localStorage.setItem('token', res.result.token);
          localStorage.setItem('user', JSON.stringify(res.result));
          localStorage.setItem('userName', res.result.userName);
          localStorage.setItem('userId', res.result.id.toString());
          this.loggedIn.next(true);

          console.log('User logged in, userName:', res.result.userName, 'userId:', res.result.id);

          if (res.result.id) {
             this.cartService.mergeLocalCartWithServerCart(res.result.id).subscribe(
               () => console.log('Giỏ hàng đã được gộp và tải sau đăng nhập'),
               (error) => console.error('Lỗi khi gộp hoặc tải giỏ hàng sau đăng nhập:', error)
             );
          } else {
              console.warn('Không tìm thấy userId trong kết quả đăng nhập, không thể gộp giỏ hàng.');
          }
        }),
        catchError(this.handleError)
      );
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true);
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.loggedIn.next(false);
    this.cartService.clearCartLocal();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Full error object:', error);
    let errorMessage = 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.status === 401) {
        errorMessage = 'Mật khẩu không đúng';
      } else if (error.status === 0) {
        errorMessage = 'Không thể kết nối đến server';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }
    return throwError(() => ({ status: error.status, message: errorMessage }));
  }
}
