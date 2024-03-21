import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SearchService } from './shared/services/search.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { IntroJsService } from './shared/intro-js/intro-js.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  
  showSearch = false;
  title = 'Superheros';
  searchKeyword

  constructor(
    private searchService : SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private introService : IntroJsService){}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),  
    ).subscribe(() => {  
      const rt = this.getChild(this.activatedRoute);  
      rt.data.subscribe(data => {  
        this.titleService.setTitle(data.title)
        this.showSearch = data.title == 'Superhero List' ? true : false;
      });
    });  
  }

  getChild(activatedRoute: ActivatedRoute) {
    if(activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  getSearchKeyword(e){
    this.searchKeyword = e.searchKeyword
    this.searchService.setSearchData(this.searchKeyword);
  }

  ngAfterViewInit(): void {
    // this.introService.introAboutApp()
  }

}
