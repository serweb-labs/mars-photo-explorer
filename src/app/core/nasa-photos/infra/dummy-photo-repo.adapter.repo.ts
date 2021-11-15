import { Manifest } from "../domain/manifest.entity";
import { PhotoCriteria, PhotoRover } from "../domain/photo-criteria.dto";
import { PhotoRepo } from "../domain/photo-repo.port";
import { Photo } from "../domain/photo.entity";

export class DummyPhotoRepo implements PhotoRepo {
    getPhotosByCriteria(criteria: PhotoCriteria): Promise<Photo[]> {
        throw new Error("Method not implemented.");
    }
    getManifestByRover(rover: PhotoRover): Promise<Manifest> {
        throw new Error("Method not implemented.");
    }

}
