import { Manifest } from "./manifest.entity";
import { PhotoCriteria, PhotoRover } from "./photo-criteria.dto";
import { Photo } from "./photo.entity";

export abstract class PhotoRepo {
 abstract getPhotosByCriteria(criteria: PhotoCriteria): Promise<Photo[]> 
 abstract getManifestByRover(rover: PhotoRover): Promise<Manifest>
}