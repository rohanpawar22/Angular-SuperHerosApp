import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClientWrapperService } from '../shared/services/http-client-wrapper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Superhero } from '../shared/superhero-info';
import { IntroJsService } from '../shared/intro-js/intro-js.service';

@Component({
  selector: 'app-superhero-details',
  templateUrl: './superhero-details.component.html',
  styleUrl: './superhero-details.component.scss'
})
export class SuperheroDetailsComponent implements OnInit, AfterViewInit {

  superHeroDetails
  loadingFlag = false;

  constructor(
    private http : HttpClientWrapperService,
    private route : ActivatedRoute,
    private introService : IntroJsService,
    private router : Router
    ){}

  ngOnInit(): void {
    this.fetchDetailsFromId()
  }

  ngAfterViewInit(): void {
    this.introService.introAboutDetails();
  }

  fetchDetailsFromId(){
    this.loadingFlag = true;
    const id = this.route.snapshot.paramMap.get('id');
    let url = `https://akabab.github.io/superhero-api/api/id/${id}.json`
    this.http.get(url).subscribe({
      next : (data) => {
        this.superHeroDetails = data
        this.loadingFlag = false;
      },
      error : (error) => {
        console.log(error);
        this.loadingFlag = false;
      }
    })
  }

  goBackHome(){
    this.router.navigateByUrl('superhero-list')
  }

}
