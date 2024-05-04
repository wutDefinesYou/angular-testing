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
    const charNameStrong = charNameDe.map(
      (div) => div.nativeElement.childNodes[0]
    );
    const cultureDe = debugElement.queryAll(By.css('.culture'));
    const cultureStrong = cultureDe.map(
      (div) => div.nativeElement.childNodes[0]
    );

    for (let i = 0; i < component.characters.length; i++) {
      expect(charNameStrong[i].textContent).toBe('name ');
      expect(cultureStrong[i].textContent).toBe('culture ');
    }
  });

  it('shows how many books this characters made an apperance in', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const booksNoDe = debugElement.queryAll(By.css('.booksno'));
    const booksNo = booksNoDe.map((div) => div.nativeElement);

    for (const ele of booksNo) {
      expect(ele.textContent).toContain('Number of Books:');
      expect(parseInt(ele.textContent.split('').at(-1))).toBeGreaterThan(0);
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
