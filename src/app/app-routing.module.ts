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
    data: {
      title: 'Superhero List'
    }
  },
  {
    path : 'details/:id',
    component : SuperheroDetailsComponent,
    data: {
      title: 'Details'
    }
  },
  {
    path : 'name-search',
    component : SearchNameComponent
  },
  {
    path : 'biography-details/:id',
    loadChildren : () => import('./biography/biography.module').then(m => m.BiographyModule),
    data: {
      title: 'Biography Details'
    }
  },
  {
    path : '**',
    component : NotFoundComponent,
    data: {
      title: 'Not Found'
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
