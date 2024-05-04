import { TestBed } from '@angular/core/testing';
import { CharacterService } from './character.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Character } from './character.model';
import { data } from './data';
import { HttpErrorResponse } from '@angular/common/http';

const page = 1;
const expectedApi = `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=10`;

describe('CharacterService', () => {
  let characterService: CharacterService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService],
    });
    characterService = TestBed.inject(CharacterService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('get characters', () => {
    let actualCharacters: Character[] | undefined;
    characterService.getCharacters(page).subscribe({
      next: (otherCharacters) => (actualCharacters = otherCharacters),
    });

    const request = controller.expectOne(expectedApi);
    request.flush(data);
    controller.verify();

    expect(actualCharacters).toEqual(data);
  });

  it('get characters (errored out)', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ProgressEvent('API error');
    let actualError: HttpErrorResponse | undefined;

    characterService.getCharacters(page).subscribe({
      next: () => fail('next handler must not be called'),
      error: (error) => (actualError = error),
      complete: () => fail('complete handler must not be called'),
    });

    const request = controller.expectOne(expectedApi);
    request.error(errorEvent, { status, statusText });

    if (!actualError) throw new Error('Error needs to be defined.');

    expect(actualError.error).toBe(errorEvent);
    expect(actualError?.status).toBe(500);
    expect(actualError.statusText).toBe(statusText);
  });
});
