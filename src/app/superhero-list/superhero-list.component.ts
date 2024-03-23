import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClientWrapperService } from '../shared/services/http-client-wrapper.service';
import { Router } from '@angular/router';
import { Superhero } from '../shared/superhero-info';
import { SearchService } from '../shared/services/search.service';
import { IntroJsService } from '../shared/intro-js/intro-js.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-superhero-list',
  templateUrl: './superhero-list.component.html',
  styleUrl: './superhero-list.component.scss'
})
export class SuperheroListComponent implements OnInit, AfterViewInit, OnDestroy {

  searchKey
  superheroesList: Superhero[] = [];
  originalSuperheroesList: Superhero[] = [];
  loadingFlag = false;
  searchDataSubscription: Subscription;

  constructor(private http: HttpClientWrapperService,
    private router: Router,
    private searchService : SearchService,
    private introService : IntroJsService
  ) {
   }

  ngOnInit(): void {
    this.fetchSuperHeroList();
    this.searchDataSubscription = this.searchService.searchData$.subscribe(data => {
      this.searchKey = data;
      this.filterSuperheroesList();
    }); 
  }

  ngOnDestroy(): void {
    if (this.searchDataSubscription) {
      this.searchDataSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.introService.introAboutApp();
  }
  
  filterSuperheroesList() {
    if (!this.searchKey || this.searchKey.trim() === '') {
      this.superheroesList = [...this.originalSuperheroesList];
    } else {
      this.superheroesList = this.originalSuperheroesList.filter(hero =>
        hero.name.toLowerCase().includes(this.searchKey.toLowerCase())
      );
    }
  }

  fetchSuperHeroList() {
    this.loadingFlag = true;
    let url = "https://akabab.github.io/superhero-api/api/all.json"
    this.http.get(url).subscribe({
      next: (data) => {
        this.superheroesList = data
        this.originalSuperheroesList = data; 
        this.loadingFlag = false;
      },
      error: (error) => {
        console.log(error);
        this.loadingFlag = false;
      }
    })
  }

  showDetails(id: any) {
    this.router.navigateByUrl(`details/${id}`)
  }

  showBiography(id : any){
    this.router.navigateByUrl(`biography-details/${id}`)
  }

}
