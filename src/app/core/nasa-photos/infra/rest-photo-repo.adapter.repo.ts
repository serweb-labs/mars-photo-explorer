import { Injectable } from '@angular/core';

import { RestClientService } from '../../shared/infra/utils/rest-clients.service';
import { ToDomainErrorsMapper } from '../../shared/infra/utils/to-domain-errors.mapper';
import { Manifest } from '../domain/manifest.entity';
import { PhotoCriteria, PhotoRover } from '../domain/photo-criteria.dto';
import { PhotoRepo } from '../domain/photo-repo.port';
import { Photo } from '../domain/photo.entity';
import { RestPhotoReponse } from './interfaces/rest-photo';
import { RestPhotoManifestReponse } from './interfaces/rest-photo-manifest';

const PHOTOS_EP = "https://api.nasa.gov/mars-photos/api/v1/rovers"
const MANIFESTS_EP = "https://api.nasa.gov/mars-photos/api/v1/manifests"

@Injectable({
  providedIn: 'any'
})
export class RestPhotoRepo implements PhotoRepo {
  constructor(private client: RestClientService) { }
  
  async getPhotosByCriteria(criteria: PhotoCriteria): Promise<Photo[]> {
    try {
      const query = this._mapCriteria(criteria);
      const res = await this.client.retrieve<RestPhotoReponse>(`${PHOTOS_EP}/${criteria.rover}/photos?${query}`, {})
      const photos: Photo[] = res.photos.map(p => {
        const ed = p.earth_date.split('-')
        return {
          id: p.id,
          src: p.img_src,
          rover: p.rover.name,
          cameraName: p.camera.full_name,
          cameraId: p.camera.name,
          sol: p.sol,
          date: new Date(+ed[0], +ed[1], +ed[2]),
        }
      })
      return photos;
    } catch (error) {
      throw ToDomainErrorsMapper.retrieve<Photo>(error);
    }
  }

  async getManifestByRover(rover: PhotoRover): Promise<Manifest> {
    try {
      const q = new URLSearchParams();
      q.append('api_key', 'DEMO_KEY');
      const res = await this.client.retrieve<RestPhotoManifestReponse>(`${MANIFESTS_EP}/${rover}?${q.toString()}`, {})
      return {
        rover: rover,
        maxEarthDate: new Date(res.photo_manifest.max_date),
        maxSol: res.photo_manifest.max_sol,
      }       
    } catch (error) {
      throw ToDomainErrorsMapper.retrieve<Photo>(error);
    }
  }

  private _mapCriteria(criteria: PhotoCriteria): string {
    const searchParams = new URLSearchParams();
    searchParams.append('api_key', 'DEMO_KEY');

    if (criteria.sol) {
      searchParams.append('sol', criteria.sol.toString());
    }

    if (criteria.camera) {
      searchParams.append('camera', criteria.camera);
    }

    if (criteria.page) {
      searchParams.append('page', criteria.page.toString());
    }

    if (criteria.date) {
      let day = criteria.date.getUTCDate()
      let month = criteria.date.getUTCMonth() + 1
      let year = criteria.date.getUTCFullYear()
      searchParams.append('earth_date', `${year}-${month}-${day}`);
    }

    return searchParams.toString();
  }

}
