import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiographyDetailsComponent } from './biography-details/biography-details.component';

const routes: Routes = [
  {
    path : '',
    component : BiographyDetailsComponent
  },
  {
    path: 'biography-details/:id',
    component : BiographyDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiographyRoutingModule { }
