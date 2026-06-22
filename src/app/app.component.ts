import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Certifica-te que tens o CommonModule
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service'; // <-- Importa o serviço

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- Adiciona o CommonModule aqui se não estiver
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Injetamos o serviço como público para o HTML conseguir aceder
  constructor(public authService: AuthService) { }
}