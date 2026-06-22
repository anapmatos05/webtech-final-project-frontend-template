import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Importaste bem aqui!
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // 1. ADICIONADO AQUI O CommonModule:
  imports: [RouterOutlet, RouterModule, CommonModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CineTrack Frontend'; 

  // 2. MUDADO de 'private' para 'public' para o HTML conseguir ler:
  constructor(public authService: AuthService) {}

  // A nossa função de teste
  testarLigacao() {
    const utilizadorTeste = {
      name: "Ulysse Teste Frontend",
      email: "teste_frontend@ipvc.pt",
      password: "password123"
    };

    console.log("A enviar dados para o Backend (Porto 3000)...");

    this.authService.register(utilizadorTeste).subscribe({
      next: (resposta) => {
        console.log("SUCESSO ABSOLUTO! O Backend devolveu:", resposta);
        alert("Ligação Perfeita! O utilizador foi criado na Base de Dados.");
      },
      error: (erro) => {
        console.error("ERRO DE LIGAÇÃO:", erro);
        alert("Falha na ligação. Abre a consola (F12) para ver o que falhou.");
      }
    });
  }
}