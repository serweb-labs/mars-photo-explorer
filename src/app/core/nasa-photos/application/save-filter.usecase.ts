import { Injectable } from '@angular/core';
import { PhotoRover } from '../domain/photo-criteria.dto';
import { SavedFilterRepo } from '../domain/saved-filter-repo.port';

@Injectable({
  providedIn: 'any'
})
export class SaveFilterUseCase {

  constructor(private repo: SavedFilterRepo) { }

  async execute(rover: PhotoRover, type: 'date' | 'sol' , data: Date | number | null): Promise<void> {
    try {
      return await this.repo.saveByRover({
          value: data,
          type: type,
          rover: rover,
          addedDate: new Date(),
      })
    } catch (error) {
      throw error;
    }
  }
  
}
