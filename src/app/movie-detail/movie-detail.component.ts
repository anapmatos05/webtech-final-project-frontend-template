import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { MovieService, Movie } from '../services/movie.service'; // Confirma se o caminho está correto

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined;
  imageBaseUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {
    // Vamos buscar o URL base das imagens ao serviço da Ana
    this.imageBaseUrl = this.movieService.IMAGE_BASE_URL;
  }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    // 1. Capturar o ID da rota (ex: /movie/123 -> id = 123)
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // 2. Chamar a função do serviço
    if (id) {
      this.movieService.getMovieDetails(id).subscribe({
        next: (data) => {
          this.movie = data;
        },
        error: (erro) => {
          console.error('Erro ao carregar os detalhes do filme:', erro);
        }
      });
    }
  }

  goBack(): void {
    // Função para regressar à página anterior
    this.location.back();
  }
}