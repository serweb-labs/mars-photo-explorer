import { PhotoRover } from "./photo-criteria.dto";

export interface Manifest {
    rover: PhotoRover
    maxSol: number
    maxEarthDate: Date
}