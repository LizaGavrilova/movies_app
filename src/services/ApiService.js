export default class ApiService {
  _apiBase = 'https://api.themoviedb.org/3/';
  apiKey = '951df45a72c2a2a67182d7d2628cf7d4';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  async getAllMovies(searchQuery, pageNumber) {
    return await this.getResource(`search/movie?api_key=${this.apiKey}&include_adult=false&query=${searchQuery}&page=${pageNumber}`);
  
  };
}