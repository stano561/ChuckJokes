import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MainPageComponent } from './main-page.component';
import { JokesService } from '../../services/jokes-service/jokes.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('MainPageComponent', () => {
  let jokesService: JokesService;
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MainPageComponent],
      providers: [JokesService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have H1 element of Chuck text', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe(
      'Chuck Norris Jokes'
    );
  });

  it('should have return array', () => {
    jokesService = fixture.debugElement.injector.get(JokesService);
    let spy = spyOn(jokesService, 'getCategories').and.callFake(() => {
      return of([]);
    });
    component.getCategories();
    expect(component.categories).toEqual([]);
  });
});
