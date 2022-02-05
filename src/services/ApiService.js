export default class ApiService {
  apiBase = 'https://api.themoviedb.org/3/';

  apiKey = '951df45a72c2a2a67182d7d2628cf7d4';

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
}
