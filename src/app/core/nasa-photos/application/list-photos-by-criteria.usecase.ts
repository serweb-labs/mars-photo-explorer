import { Injectable } from '@angular/core';
import { PhotoCriteria } from '../domain/photo-criteria.dto';
import { PhotoRepo } from '../domain/photo-repo.port';
import { Photo } from '../domain/photo.entity';

@Injectable({
  providedIn: 'any'
})
export class ListPhotosByCriteriaUseCase {

  constructor(private repo: PhotoRepo) { }

  async execute(criteria: PhotoCriteria): Promise<Photo[]> {
    try {
      return await this.repo.getPhotosByCriteria(criteria)
    } catch (error) {
      throw error;
    }
  }
}
