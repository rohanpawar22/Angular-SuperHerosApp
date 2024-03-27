import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  defaultImage : string = '.assets/ImgNotAvailable.jpeg';

  searchKey
  superheroesList: Superhero[] = [];
  originalSuperheroesList: Superhero[] = [];
  searchDataSubscription: Subscription;

  loadingFlag = false;

  @ViewChild('contentBox', { static: true }) contentBoxRef!: ElementRef;

  constructor(private http: HttpClientWrapperService,
    private router: Router,
    private searchService: SearchService,
    private introService: IntroJsService
  ) { }

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
    this.contentBoxRef.nativeElement.addEventListener('scroll', this.onContentBoxScroll.bind(this));
  }


  onContentBoxScroll(event: Event) {
    const contentBox = event.target as HTMLElement;
    const scrollPosition = Math.ceil(contentBox.scrollTop + contentBox.clientHeight);
    const scrollHeight = contentBox.scrollHeight;
    const scrollPercentage = (scrollPosition / scrollHeight) * 100;
    const topButton = document.getElementById('topButton');
    const downButton = document.getElementById('downButton');
    if (scrollPosition === 0) {
      topButton.style.display = 'none';
      downButton.style.display = 'none';
    }
    if (topButton) {
      if (scrollPercentage >= 2) {
        topButton.style.display = 'block';
      } else {
        topButton.style.display = 'none';
      }
    }
    if(downButton){
      if (scrollPercentage >= 2 && scrollPercentage <= 99) {
        downButton.style.display = 'block';
      } else {
        downButton.style.display = 'none';
      }
    }
  }

  scrollToTop() {
    const contentBox = document.querySelector('.container');
    if (contentBox) {
      contentBox.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  scrollToDown(){
    const contentBox = document.querySelector('.container');
    if (contentBox) {
      contentBox.scrollTo({ top: contentBox.scrollHeight, behavior: 'smooth' });
    }
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

  showBiography(id: any) {
    this.router.navigateByUrl(`biography-details/${id}`)
  }

}
