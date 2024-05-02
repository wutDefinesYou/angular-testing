import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from './character.model';
import { Observable } from 'rxjs';

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
