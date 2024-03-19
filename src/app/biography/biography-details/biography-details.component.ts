import { Component, OnInit } from '@angular/core';
import { HttpClientWrapperService } from '../../shared/services/http-client-wrapper.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-biography-details',
  templateUrl: './biography-details.component.html',
  styleUrl: './biography-details.component.scss'
})
export class BiographyDetailsComponent implements OnInit{

  superHeroDetails
  loadingFlag = false;

  constructor(private http : HttpClientWrapperService, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.fetchDetailsFromId()
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

}
