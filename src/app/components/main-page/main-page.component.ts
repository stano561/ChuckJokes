import { Component, OnInit } from '@angular/core';
import { IJoke } from '../../models/IJoke';
import { JokesService } from '../../services/jokes-service/jokes.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  currentJoke?: IJoke;
  searchText!: string;
  categories!: string[];
  currentCategory?: string;

  @HostListener('document:keyup.r')
  handleKeyboardEvent() {
    this.getRandomJoke();
  }

  constructor(private jokesService: JokesService) {}

  ngOnInit(): void {
    this.getRandomJoke();
    this.getCategories();
  }

  getRandomJoke() {
    this.jokesService
      .getRandomJoke()
      .subscribe((data) => (this.currentJoke = data));
  }

  getSearchJoke(searchText: string) {
    if (searchText == null || searchText == '') {
      this.getRandomJoke();
      this.currentCategory = '';
    } else if (searchText.length < 3 || searchText.length > 120) {
      this.currentJoke!.value = '';
      this.currentCategory = '';
    } else {
      this.jokesService.getRandomJokeSearch(searchText).subscribe((data) => {
        if (data.total != 0) {
          this.currentJoke =
            data.result[Math.floor(Math.random() * data.total)];
          this.currentCategory = '';
        } else {
          this.currentJoke!.value = '';
          this.currentCategory = '';
        }
      });
    }
  }

  getCategoryJoke(category: string) {
    this.jokesService.getCategoryJoke(category).subscribe((data) => {
      if (this.currentJoke != null) {
        this.currentJoke.value = data.value;
        this.currentCategory = data.categories[0];
        this.searchText = '';
      } else {
        this.currentJoke!.value = '';
        this.currentCategory = '';
      }
    });
    this.getCategories();
  }

  getCategories() {
    this.jokesService.getCategories().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });
  }
}
