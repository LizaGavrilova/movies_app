export default class ApiService {
  apiBase = 'https://api.themoviedb.org/3/';

  apiKey = '951df45a72c2a2a67182d7d2628cf7d4';

  token = JSON.parse(localStorage.getItem('guestToken'));

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  async getAllMovies(searchQuery, pageNumber) {
    const res = await this.getResource(
      `search/movie?api_key=${this.apiKey}&include_adult=false&query=${searchQuery}&page=${pageNumber}`
    );
    return res;
  }

  // Гостевая сессия
  async createGuestSession() {
    const res = await this.getResource(`authentication/guest_session/new?api_key=${this.apiKey}`);
    return res.guest_session_id;
  }

  // Список жанров
  async getGenres() {
    const res = await this.getResource(`genre/movie/list?api_key=${this.apiKey}`);
    return res.genres;
  }
}
