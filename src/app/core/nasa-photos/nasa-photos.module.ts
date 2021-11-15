import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PhotoRepo } from './domain/photo-repo.port';
import { RestPhotoRepo } from './infra/rest-photo-repo.adapter.repo';
import { SavedFilterRepo } from './domain/saved-filter-repo.port';
import { LocalStorageSavedFilterRepo } from './infra/local-storage-saved-filter-repo.adapter.repo';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    {provide: PhotoRepo, useExisting: RestPhotoRepo},
    {provide: SavedFilterRepo, useExisting: LocalStorageSavedFilterRepo}

  ]
})
export class NasaPhotosModule { }
