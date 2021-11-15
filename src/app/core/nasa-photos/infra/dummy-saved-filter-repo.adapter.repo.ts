import { PhotoRover } from "../domain/photo-criteria.dto";
import { SavedFilterRepo } from "../domain/saved-filter-repo.port";
import { SavedFilter } from "../domain/saved-filter.entity";

export class DummySavedFilterRepo implements SavedFilterRepo {
    retrieveByRover(rover: PhotoRover): Promise<SavedFilter[]> {
        throw new Error("Method not implemented.");
    }
    saveByRover(filter: SavedFilter): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
