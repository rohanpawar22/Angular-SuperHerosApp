import { Component, OnInit } from '@angular/core';
import { HttpClientWrapperService } from '../shared/services/http-client-wrapper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Superhero } from '../shared/superhero-info';

@Component({
  selector: 'app-superhero-details',
  templateUrl: './superhero-details.component.html',
  styleUrl: './superhero-details.component.scss'
})
export class SuperheroDetailsComponent implements OnInit {

  superHeroDetails
  loadingFlag = false;

  constructor(private http : HttpClientWrapperService, private route : ActivatedRoute,
    private router : Router){}

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
        console.log(this.superHeroDetails);
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
