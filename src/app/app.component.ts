import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service'; // <-- Importamos o nosso serviço

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], 
  templateUrl: './app.component.html', // Mantemos o teu HTML!
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CineTrack Frontend'; 

  // Injetamos o serviço para o podermos usar
  constructor(private authService: AuthService) {}

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