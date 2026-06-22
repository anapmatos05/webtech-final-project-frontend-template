# Project Information

## Group Members

- Student 1: Ana Matos
- Student 2: Ulysse Cancela
- Student 3: Afonso Sousa

## Project Theme
- Plataforma de Cinema para pesquisa, organização, acompanhamento e avaliação de filmes.

## External API Used

- API name: The Movie Database (TMDB)
- API link: https://www.themoviedb.org/
- Requires API key? Yes

## Backend Repository

- Link:https://github.com/Afonso2121/webtech-final-project-backend-template.git 

## Main Features

1. **Pesquisa Dinâmica de Filmes:** Motor de busca interligado com a API da TMDB para encontrar títulos em tempo real através de palavras-chave.
2. **Listagem de Filmes Populares:** Apresentação dos filmes em destaque consumidos dinamicamente da API externa.
3. **Sistema de Gestão de Favoritos:** Permite ao utilizador adicionar e remover filmes da sua lista pessoal de favoritos com persistência de dados.
4. **Sistema de Watchlist:** Organização de filmes para ver mais tarde com controlo de estados (pendente, a ver, visto).
5. **Sistema de Avaliações (Reviews):** Criação, edição e remoção (CRUD) de notas e comentários na base de dados para cada filme.

## Pages

- **Home:** Listagem de filmes populares e em destaque obtidos através da API externa (TMDB).
- **List:** Página de resultados com a listagem dos filmes encontrados pelo motor de pesquisa.
- **Detail:** Ecrã detalhado de um filme com sinopse, classificação, botões para adicionar à Watchlist/Favoritos e a secção de avaliações.
- **Form/Create/Edit:** Formulário integrado para criar, atualizar e remover as Reviews (Notas/Comentários) dos filmes.

## Data Stored in the Backend

- favorites
- watchlist
- reviews / notas

## Notes

- **Frontend:** Desenvolvido em **Angular** utilizando a arquitetura clássica assente em Módulos (`NgModule`), garantindo a correta declaração, exportação e isolamento de componentes como o `SearchComponent`.
- **Backend:** Desenvolvido em **Node.js / Express**, incluindo regras de validação de dados e documentação exaustiva de todas as rotas da equipa através do **Swagger** (`swagger.js`).
