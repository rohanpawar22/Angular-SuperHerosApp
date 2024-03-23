import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClientWrapperService } from '../../shared/services/http-client-wrapper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IntroJsService } from '../../shared/intro-js/intro-js.service';

@Component({
  selector: 'app-biography-details',
  templateUrl: './biography-details.component.html',
  styleUrl: './biography-details.component.scss'
})
export class BiographyDetailsComponent implements OnInit, AfterViewInit {

  superHeroDetails
  loadingFlag = false;

  constructor(
    private http: HttpClientWrapperService,
    private route: ActivatedRoute,
    private introService: IntroJsService
    ) { }

  ngOnInit(): void {
    this.fetchDetailsFromId()
  }

  ngAfterViewInit(): void {
    this.introService.introAboutBiography();
  }

  fetchDetailsFromId() {
    this.loadingFlag = true;
    const id = this.route.snapshot.paramMap.get('id');
    let url = `https://akabab.github.io/superhero-api/api/id/${id}.json`
    this.http.get(url).subscribe({
      next: (data) => {
        this.superHeroDetails = data
        this.loadingFlag = false;
      },
      error: (error) => {
        console.log(error);
        this.loadingFlag = false;
      }
    })
  }

}
