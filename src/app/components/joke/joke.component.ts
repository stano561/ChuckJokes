import { Component, OnInit, Input } from '@angular/core';
import { IJoke } from 'src/app/models/IJoke';

@Component({
  selector: 'app-joke-component',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css'],
})
export class JokeComponent implements OnInit {
  @Input() joke?: IJoke;
  @Input() category?: string;

  constructor() {}

  ngOnInit(): void {}
}
