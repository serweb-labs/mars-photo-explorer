import { PhotoRover } from "./photo-criteria.dto";

export interface SavedFilter {
    rover: PhotoRover,
    type: 'date' | 'sol';
    value: Date | number | null;
    addedDate: Date,
}