import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.errorMessage = '';

    this.authService.register(this.user).subscribe({
      next: (res) => {
        console.log('Conta criada e login efetuado com sucesso!', res);
        // Chuta o utilizador para a Home já autenticado
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'Erro ao criar conta. Tenta novamente.';
      }
    });
  }
}