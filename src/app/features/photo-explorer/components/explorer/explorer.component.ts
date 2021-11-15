import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ExplorerState, StateName } from '@feat/photo-explorer/state/explorer/explorer.state';
import * as Actions from '@feat/photo-explorer/state/explorer/explorer.actions';
import { ExplorerBloc } from '@feat/photo-explorer/state/explorer/explorer.bloc';
import { SavedFilter } from '@core/nasa-photos/domain/saved-filter.entity';
import { SubsHandler } from '@core/shared/presentation/utils/subs-handler';
import { Cameras, Rovers } from '@feat/photo-explorer/state/explorer/explorer.interfaces';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent implements OnInit {
  filterByRover = new FormControl(true);
  filterByCamera = new FormControl({value: null, disabled: true});
  stateName = StateName;
  state: ExplorerState;
  subs = new SubsHandler();

  constructor(private bloc: ExplorerBloc) {
    this.state = bloc.state.getValue();
  }

  ngOnInit(): void {
    this._statePull();
    this._statePush();
  }

  private _statePull(): void {
    this.subs.add = this.bloc.state.subscribe((state)=> {
      this.state = state;
    })
  }

  private _statePush(): void {

    this.subs.add = this.filterByRover
    .valueChanges.subscribe((v: Rovers)=>{ 
      this.bloc.add(new Actions.SetRoverAction(v))
      this.bloc.add(new Actions.SaveFilterHistoryAction(this.state.rover, "date", new Date()));
    });

    this.subs.add = this.filterByCamera
    .valueChanges.subscribe((v: Cameras)=>{ 
      this.bloc.add(new Actions.FilterByCameraAction(v))
    });

  }

  nextPage(): void {
    this.bloc.add(new Actions.SetPageAction(this.state.page + 1))
  }
  
  prevPage(): void {
    this.bloc.add(new Actions.SetPageAction(this.state.page - 1))
  }

  filterBySol(v: number) {
    this.bloc.add(new Actions.FilterBySolAction(v));
    this.bloc.add(new Actions.SaveFilterHistoryAction(this.state.rover, "sol", v));
  }

  filterByLatest() {
    this.bloc.add(new Actions.FilterByLatestDateAction());
    this.bloc.add(new Actions.SaveFilterHistoryAction(this.state.rover, "latest", null));
  }

  filterByDate(v: Date)  {
    this.bloc.add(new Actions.FilterByDateAction(v))
    this.bloc.add(new Actions.SaveFilterHistoryAction(this.state.rover, "date", v));
  }

  filterBySavedFilter(filter: SavedFilter) {
    if (filter.value instanceof Date) {
      this.bloc.add(new Actions.FilterByDateAction(filter.value));
    }
    else {
      this.bloc.add(new Actions.FilterBySolAction(filter.value as number));
    }
  }

  isState(stateName: StateName) {
    return this.state.name === stateName;
  }

  ngOnDestroy() {
    this.subs.dispose();
  }

}