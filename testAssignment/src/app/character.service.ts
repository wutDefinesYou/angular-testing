import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) {}

  getCharacters(page = 1): Observable<Character[]> {
    return this.http.get<Character[]>(
      `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=10`
    );
  }
}
