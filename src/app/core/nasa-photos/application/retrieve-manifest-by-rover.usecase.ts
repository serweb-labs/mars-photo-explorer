import { Injectable } from '@angular/core';
import { Manifest } from '../domain/manifest.entity';
import { PhotoRover } from '../domain/photo-criteria.dto';
import { PhotoRepo } from '../domain/photo-repo.port';

@Injectable({
  providedIn: 'any'
})
export class RetrieveManifestByRoverUseCase {

  constructor(private repo: PhotoRepo) { }

  async execute(rover: PhotoRover): Promise<Manifest> {
    try {
      return await this.repo.getManifestByRover(rover)
    } catch (error) {
      throw error;
    }
  }

}
