import { PhotoRover } from "src/app/core/nasa-photos/domain/photo-criteria.dto";
import { Cameras, FilterType, Rovers } from "./explorer.interfaces";

export interface ExplorerAction { }

export class SetPageAction implements ExplorerAction {
    constructor(public page: number) {}
}

export class SetRoverAction implements ExplorerAction {
    constructor(public rover: Rovers) {}
}

export class FilterByCameraAction implements ExplorerAction {
    constructor(public camera: Cameras) {}
}

export class FilterByDateAction implements ExplorerAction {
    constructor(public date: Date) {}
}

export class FilterByLatestDateAction implements ExplorerAction { }

export class FilterBySolAction implements ExplorerAction  {
    constructor(public value: number) {}
}

export class SaveFilterHistoryAction implements ExplorerAction  {
    constructor(public rover: PhotoRover, public type: FilterType, public value?: Date | number) {}
}
