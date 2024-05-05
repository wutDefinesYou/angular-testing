import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { data } from './data';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    component.characters = data;
    fixture.detectChanges();
  });

  it('show fields for "name" and "culture"', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const charNameDe = debugElement.queryAll(By.css('.charname'));
    const charNameDiv = charNameDe.map((div) => div.nativeElement);
    const cultureDe = debugElement.queryAll(By.css('.culture'));
    const cultureDiv = cultureDe.map((div) => div.nativeElement);

    for (let i = 0; i < component.characters.length; i++) {
      if (component.characters[i].name)
        expect(charNameDiv[i].textContent.trim()).toBe(
          `name  ${component.characters[i].name}`
        );
      else
        expect(charNameDiv[i].textContent.trim()).toBe(
          `name  ${component.characters[i].aliases[0]}`
        );

      expect(cultureDiv[i].textContent.trim()).toBe(
        `culture ${component.characters[i].culture}`
      );
    }
  });

  it('shows how many books this characters made an apperance in', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const booksNoDe = debugElement.queryAll(By.css('.booksno'));
    const booksNo = booksNoDe.map((div) => div.nativeElement);

    for (let i = 0; i < component.characters.length; i++) {
      expect(booksNo[i].textContent.trim()).toBe(
        `Number of Books: ${component.characters[i].books.length}`
      );
    }
  });

  it('shows alias if no name is present', () => {
    component.characters[0].name = '';
    fixture.detectChanges();

    const debugElement: DebugElement = fixture.debugElement;
    const charNameDe = debugElement.query(By.css('.charname'));
    const charNameDiv = charNameDe.nativeElement;

    expect(charNameDiv.textContent.split('  ')[1].trim()).toBe(
      component.characters[0].aliases[0]
    );
  });
});
