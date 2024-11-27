import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  activeForm: 'login' | 'register' = 'login';
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForms();
  }

  createForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  switchForm(type: 'login' | 'register') {
    this.activeForm = type;
  }

  onSubmit(type: 'login' | 'register') {
    if (type === 'login' && this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso:', response);
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/home']); // Redirigir a la ruta /home
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Error al iniciar sesión');
        }
      );
    } else if (type === 'register' && this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.authService.register({ name, email, password }).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          alert('Registro exitoso. Por favor, inicie sesión.');
          this.switchForm('login'); // Cambiar al formulario de login
        },
        (error) => {
          console.error('Error al registrarse:', error);
          alert('Error al registrarse');
        }
      );
    }
  }
}
