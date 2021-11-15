import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

import { ExplorerComponent } from './components/explorer/explorer.component';
import { NasaPhotosModule } from 'src/app/core/nasa-photos/nasa-photos.module';
import { PhotoComponent } from './components/photo/photo.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { ExplorerState, ExplorerStateController, explorerStateFactory, StateName } from './state/explorer/explorer.state';
import { BehaviorSubject } from 'rxjs';

@NgModule({
  declarations: [
    ExplorerComponent,
    DateFilterComponent,
    PhotoComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatIconModule,
    MatNativeDateModule,  
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    MatAutocompleteModule,
    OverlayModule,
    MatProgressSpinnerModule,
    MatSliderModule,

    NasaPhotosModule,
  ],
  exports: [
    ExplorerComponent,
  ],
  providers: [
    {
      provide: ExplorerStateController,
      useValue: new BehaviorSubject<ExplorerState>(explorerStateFactory()),
    }
  ],
})
export class PhotoExplorerModule { }
