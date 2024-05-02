import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Character } from './character.model';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  characters: Character[] = [];
  pageNumber: number = 1;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    this.characterService.getCharacters(this.pageNumber)
      .subscribe(
        (newCharacters: Character[]) => {
          this.characters = newCharacters;
        },
        (error: any) => {
          console.error('Error fetching characters:', error);
        }
      );
  }

  handleClick(): void {
    this.pageNumber++;
    this.fetchCharacters();
  }
}
