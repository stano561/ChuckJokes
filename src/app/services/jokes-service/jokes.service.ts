import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJoke } from '../../models/IJoke';
import { IJokesArr } from 'src/app/models/IJokesArr';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  private randomJokeUrl = 'https://api.chucknorris.io/jokes/random';
  private searchJokeUrl = 'https://api.chucknorris.io/jokes/search?query=';
  private categortJokeUrl = 'https://api.chucknorris.io/jokes/random?category=';
  private categoriesUrl = 'https://api.chucknorris.io/jokes/categories';

  constructor(private http: HttpClient) {}

  getRandomJokeSearch(query: string): Observable<IJokesArr> {
    return this.http.get<IJokesArr>(this.searchJokeUrl + query);
  }

  getRandomJoke(): Observable<IJoke> {
    return this.http.get<IJoke>(this.randomJokeUrl);
  }

  getCategoryJoke(query: string): Observable<IJoke> {
    return this.http.get<IJoke>(this.categortJokeUrl + query);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.categoriesUrl);
  }
}
