import { Component, OnInit } from '@angular/core';
import { HttpClientWrapperService } from '../shared/services/http-client-wrapper.service';
import { Router } from '@angular/router';
import { Superhero } from '../shared/superhero-info';

@Component({
  selector: 'app-superhero-list',
  templateUrl: './superhero-list.component.html',
  styleUrl: './superhero-list.component.scss'
})
export class SuperheroListComponent implements OnInit {

  superheroesList: Superhero[] = [];
  loadingFlag = false;

  constructor(private http: HttpClientWrapperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchSuperHeroList();
  }

  fetchSuperHeroList() {
    this.loadingFlag = true;
    let url = "https://akabab.github.io/superhero-api/api/all.json"
    this.http.get(url).subscribe({
      next: (data) => {
        this.superheroesList = data
        this.loadingFlag = false;
      },
      error: (error) => {
        console.log(error);
        this.loadingFlag = false;
      }
    })
  }

  showDetails(id: any) {
    console.log(id);
    this.router.navigateByUrl(`details/${id}`)
  }

  showBiography(id : any){
  }

}
