import { Component } from '@angular/core';
// 1. Garante que o RouterModule está importado aqui em cima:
import { RouterOutlet, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Adiciona o RouterModule dentro destes parênteses retos:
  imports: [RouterOutlet, RouterModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'O vosso título original'; // Deixa o que já cá estiver!
}
