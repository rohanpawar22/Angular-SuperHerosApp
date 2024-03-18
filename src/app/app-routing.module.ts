import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroListComponent } from './superhero-list/superhero-list.component';
import { SearchNameComponent } from './search-name/search-name.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SuperheroDetailsComponent } from './superhero-details/superhero-details.component';

const routes: Routes = [

  {
    path : '',
    redirectTo : 'superhero-list',
    pathMatch : 'full'

  },
  {
    path : 'superhero-list',
    component : SuperheroListComponent,
  },
  {
    path : 'details/:id',
    component : SuperheroDetailsComponent,
  },
  {
    path : 'name-search',
    component : SearchNameComponent
  },
  {
    path : '**',
    component : NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
