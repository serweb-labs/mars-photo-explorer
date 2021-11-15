import { Injectable } from "@angular/core";

import { PhotoRover } from "../domain/photo-criteria.dto";
import { SavedFilterRepo } from "../domain/saved-filter-repo.port";
import { SavedFilter } from "../domain/saved-filter.entity";

@Injectable({
  providedIn: 'any'
})
export class LocalStorageSavedFilterRepo implements SavedFilterRepo {
    constructor() { }

    async saveByRover(filter: SavedFilter): Promise<void> {
      const raw = localStorage.getItem('saved-filters');
      const filters = raw ? JSON.parse(raw): {};

      if (filters[filter.rover] === undefined) {
        filters[filter.rover] = [];
      }

      filters[filter.rover].push(filter);

      localStorage.setItem('saved-filters', JSON.stringify(filters));
    }

    async retrieveByRover(rover: PhotoRover): Promise<SavedFilter[]> {
      const raw = localStorage.getItem('saved-filters');
      const filters = raw ? JSON.parse(raw): {};
      const byRover =  filters[rover] ? filters[rover] : []

      return byRover.map((f)=> {
        if (f.type === 'date') {
          f.value = new Date(f.value);
        }
        f.addedDate = new Date(f.addedDate);
        return f;
      })
    }

}
