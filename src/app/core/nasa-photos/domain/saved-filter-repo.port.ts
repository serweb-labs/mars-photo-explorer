import { PhotoRover } from "./photo-criteria.dto";
import { SavedFilter } from "./saved-filter.entity";

export abstract class SavedFilterRepo {
 abstract retrieveByRover(rover: PhotoRover): Promise<SavedFilter[]>
 abstract saveByRover(filter: SavedFilter): Promise<void>
}