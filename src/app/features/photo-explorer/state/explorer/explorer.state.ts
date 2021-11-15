import { BehaviorSubject } from "rxjs";
import { PhotoCamera, PhotoRover } from "src/app/core/nasa-photos/domain/photo-criteria.dto";
import { Photo } from "src/app/core/nasa-photos/domain/photo.entity";
import { SavedFilter } from "src/app/core/nasa-photos/domain/saved-filter.entity";
import { Camera } from "./explorer.interfaces";

export class ExplorerStateController extends BehaviorSubject<ExplorerState> { }

export interface ExplorerState {
    name: StateName
    rover: PhotoRover | null
    page: number
    camera: PhotoCamera | null
    date: Date
    maxSol: number
    maxEarthDate: Date,
    sol: number;
    data?: {
        photos: Photo[]
        cameras: Camera[]
    }
    savedFilters: SavedFilter[]
    activeFilter: 'date' | 'latest' | 'today' | 'sol'
}

export enum StateName {
    Initial = 'INITIAL',
    Loading = 'LOADING',
    Results = 'RESULTS',
    UnknownError = "UNKNOWN_ERROR",
    RateError = "RATE_ERROR",
    ConnectionError = "CONNECTION_ERROR",
}

export const explorerStateFactory = (partial: Partial<ExplorerState> = {}): ExplorerState => {
    const initialState: ExplorerState = {
        name: StateName.Initial,
        rover: null,
        camera: null,
        page: 1,
        date: new Date(),
        sol: 1,
        maxSol: 1,
        maxEarthDate: null,
        savedFilters: [],
        activeFilter: 'today',
    }
    return {...initialState, ...partial};
}