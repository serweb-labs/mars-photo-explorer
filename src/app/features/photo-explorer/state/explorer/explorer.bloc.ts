import { Injectable } from "@angular/core";

import { ListPhotosByCriteriaUseCase } from "@core/nasa-photos/application/list-photos-by-criteria.usecase";
import { RetrieveManifestByRoverUseCase } from "@core/nasa-photos/application/retrieve-manifest-by-rover.usecase";
import { RetrieveSavedFiltersUseCase } from "@core/nasa-photos/application/retrieve-saved-filters.usacase";
import { SaveFilterUseCase } from "@core/nasa-photos/application/save-filter.usecase";
import { Manifest } from "@core/nasa-photos/domain/manifest.entity";
import { PhotoRover } from "@core/nasa-photos/domain/photo-criteria.dto";
import { PermissionError, UnavailableError } from "@core/shared/domain/errors";
import { ExplorerAction, FilterByCameraAction, FilterByDateAction, FilterByLatestDateAction, FilterBySolAction, SaveFilterHistoryAction, SetPageAction, SetRoverAction } from "./explorer.actions";
import { Camera, cameras } from "./explorer.interfaces";
import { ExplorerState, ExplorerStateController, StateName } from "./explorer.state";

@Injectable({
  providedIn: 'any'
})
export class ExplorerBloc {

  private _manifests = new Map<PhotoRover, Manifest>();

  constructor(
    public state: ExplorerStateController,
    private listUC: ListPhotosByCriteriaUseCase,
    private manifestUC: RetrieveManifestByRoverUseCase,
    private retrieveFiltersUC: RetrieveSavedFiltersUseCase,
    private saveFilterUC: SaveFilterUseCase,
  ) { }

  add(action: ExplorerAction) {
    if (action instanceof SetPageAction) {
      void this._setPageHandler(action);
    }
    else if (action instanceof SetRoverAction) {
      void this._setRoverHandler(action);
    }
    else if (action instanceof FilterByCameraAction) {
      void this._filterByCameraHandler(action);
    }
    else if (action instanceof FilterByDateAction) {
      void this._setDateHandler(action);
    }
    else if (action instanceof FilterByLatestDateAction) {
      void this._setLatestDateHandler(action);
    }
    else if (action instanceof FilterBySolAction) {
      void this._searchBySolHandler(action);
    }
    else if (action instanceof SaveFilterHistoryAction) {
      void this._saveFilterHistoryHandler(action);
    }
  }

  private async _saveFilterHistoryHandler(action: SaveFilterHistoryAction) {
    let value = action.value;
    if (action.type === 'latest') {
      try {
        const manifest = await this._getManifest();
        value = manifest.maxEarthDate;
      } catch (error) {
        this._patchState(this._retrieveErrorPatch(error));
        return;
      }
    }
    await this.saveFilterUC.execute(action.rover, action.type === 'sol' ? 'sol' : 'date', value);
    this._patchState({
      savedFilters: await this.retrieveFiltersUC.execute(action.rover),
    });
  }
  
  private async _searchBySolHandler(action: FilterBySolAction) {
    this._patchState({name: StateName.Loading, activeFilter: 'sol', sol: action.value, date: null});
    this._patchState(await this._retrievePhotosPatch());
  }

  private async _setLatestDateHandler(action: FilterByLatestDateAction) {
      this._patchState({name: StateName.Loading, activeFilter: 'latest'});
      let manifest = await this._getManifest();
      this._patchState({
        date: manifest.maxEarthDate,
      });
      this._patchState(await this._retrievePhotosPatch());
  }

  private async _setDateHandler(action: FilterByDateAction) {
    this._patchState({name: StateName.Loading, activeFilter: 'date', date: action.date,  sol: null});
    this._patchState(await this._retrievePhotosPatch());
  }

  private async _filterByCameraHandler(action: FilterByCameraAction) {
    this._patchState({camera: action.camera, name: StateName.Loading});
    this._patchState(await this._retrievePhotosPatch());
  }
  
  private async _setRoverHandler(action: SetRoverAction) {
    if (action.rover === null) {
      this._patchState({name: StateName.Initial,  rover: null});
      return;
    }
    this._patchState({name: StateName.Loading, rover: action.rover});
    this._patchState(await this._retrievePhotosPatch());
  }

  private async _setPageHandler(action: SetPageAction) {
    this._patchState({name: StateName.Loading,  page: action.page});
    this._patchState(await this._retrievePhotosPatch());
  }

  private _getCamerasByRover(rover: PhotoRover): Camera[] {
    return [...cameras[rover]];
  };

  private _patchState(state: Partial<ExplorerState>) {
    const newState: ExplorerState = { 
      ...this.state.getValue(),
      ...state,
    }
    this.state.next(newState);
  }

  private async _retrievePhotosPatch(): Promise<Partial<ExplorerState>> {
    const current = this.state.getValue();
    let pics = [];

    try {
      pics = await this.listUC.execute({
        rover: current.rover,
        date: ['date', 'today', 'latest'].includes(current.activeFilter) ? current.date: null,
        sol: current.activeFilter === 'sol' ? current.sol: null,
        page: current.page,
        camera: current.camera,
      })
        
    } catch (error) {
      return this._retrieveErrorPatch(error);
    }

    let manifest: Manifest;
    try {
      manifest = await this._getManifest();
    } catch (error) {
      return this._retrieveErrorPatch(error);
    }

    const data =  {
      cameras: this._getCamerasByRover(current.rover),
      photos: pics,
    };

    return { 
      name: StateName.Results,
      maxSol: manifest.maxSol,
      maxEarthDate: manifest.maxEarthDate,
      savedFilters: await this.retrieveFiltersUC.execute(current.rover),
      data,
    };

  }

  private async _getManifest(): Promise<Manifest> {
    const current = this.state.getValue();
    if (!this._manifests.get(current.rover)) {
      const manifest = await this.manifestUC.execute(current.rover);
      this._manifests.set(current.rover, manifest);
    }
    return this._manifests.get(current.rover);
  }

  private _retrieveErrorPatch(error: Error): Partial<ExplorerState> {
    if (error instanceof UnavailableError) {
      return {name: StateName.ConnectionError };
    }
    if (error instanceof PermissionError) {
      return {name: StateName.RateError };
    }
    return { name: StateName.UnknownError }
  }


}
