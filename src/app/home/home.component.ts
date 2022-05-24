import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Books: {id: number, title: string, genre: string}[] | null = null;
  fname = "";
  lname = "";
  constructor() { }

  ngOnInit(): void {
  }

  request (id: number, fname: string, lname: string) {

  }

}
