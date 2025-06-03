import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      passWord: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.error = 'Vui lòng nhập đầy đủ thông tin đăng nhập';
      return;
    }

    this.isLoading = true;
    this.error = '';

    const loginRequest: LoginRequest = {
      userName: this.loginForm.get('userName')?.value,
      passWord: this.loginForm.get('passWord')?.value
    };

    this.authService.login(loginRequest).subscribe({
  next: (user) => {
    localStorage.setItem('token', user.result.token);
    localStorage.setItem('user', JSON.stringify(user)); 
    this.router.navigate(['/']);
  },
  error: (err) => {
    this.isLoading = false;

    console.error('Lỗi đăng nhập:', err); 

    if (err.status === 0) {
      this.error = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối hoặc thử lại sau.';
    } else if (err.status === 400) {
      this.error = err.error?.message || 'Yêu cầu không hợp lệ. Vui lòng kiểm tra thông tin đăng nhập.';
    } else if (err.status === 401) {
      this.error = 'Mật khẩu không đúng.';
    } else if (err.status === 403) {
      this.error = 'Bạn không có quyền truy cập.';
    } else if (err.status === 404) {
      this.error = 'Không tìm thấy API đăng nhập. Có thể sai URL hoặc server chưa chạy.';
    } else if (err.status >= 500) {
      this.error = 'Tài khoản không tồn tại ';
    } else {
      this.error = err.error?.message || `Đã xảy ra lỗi không xác định (mã: ${err.status})`;
    }
  },
  complete: () => {
    this.isLoading = false;
  }
});

  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Vui lòng nhập thông tin này';
    }
    if (control?.hasError('minlength')) {
      return controlName === 'userName' 
        ? 'Tên đăng nhập phải có ít nhất 3 ký tự'
        : 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return '';
  }

} 