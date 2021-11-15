import { Injectable } from '@angular/core';
import { PhotoRover } from '../domain/photo-criteria.dto';
import { SavedFilterRepo } from '../domain/saved-filter-repo.port';
import { SavedFilter } from '../domain/saved-filter.entity';

@Injectable({
  providedIn: 'any'
})
export class RetrieveSavedFiltersUseCase {

  constructor(private repo: SavedFilterRepo) { }

  async execute(rover: PhotoRover): Promise<SavedFilter[]> {
    try {
      const filters =  await this.repo.retrieveByRover(rover)
      filters.sort((a, b)=>b.addedDate.getTime() - a.addedDate.getTime());
      return filters.filter((v, i) => i <= 10);
    } catch (error) {
      throw error;
    }
  }
  
}
