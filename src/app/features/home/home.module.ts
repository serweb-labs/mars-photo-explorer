import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PhotoExplorerModule } from '../photo-explorer/photo-explorer.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    
    HomeRoutingModule,
    PhotoExplorerModule,
  ],
})
export class HomeModule { }
