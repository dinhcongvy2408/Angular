import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required]
    });
  }

  onSubmit(): void {
  if (this.registerForm.invalid) {
    this.error = 'Vui lòng nhập đầy đủ thông tin';
    return;
  }

  const newUser: User = {
    ...this.registerForm.value,
    role: 'USER'
  };

  this.authService.register(newUser).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: (err) => {
      if (err.status === 401) {
        this.error = 'Không có quyền đăng ký.';
      } else {
        this.error = err.error?.message || 'Đăng ký thất bại';
      }
    }
  });
}
}
