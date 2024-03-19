import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BiographyRoutingModule } from './biography-routing.module';
import { BiographyDetailsComponent } from './biography-details/biography-details.component';

// Materials Imports
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    BiographyDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BiographyRoutingModule,
    MatCardModule,
  ]
})
export class BiographyModule { }
