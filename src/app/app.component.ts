import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  title = 'Superheros';
  searchKeyword

  constructor(){}

  ngOnInit(): void {
  }

  getSearchKeyword(e){
    this.searchKeyword = e.searchKeyword
  }

}
