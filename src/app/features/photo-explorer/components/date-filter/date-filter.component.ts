import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

import { SavedFilter } from '@core/nasa-photos/domain/saved-filter.entity';
import { SubsHandler } from '@core/shared/presentation/utils/subs-handler';
import { ExplorerState, StateName } from '@feat/photo-explorer/state/explorer/explorer.state';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {

  @Input() set fromState(state: ExplorerState) {
    this.state = state;
    this.filterByEarthDate.setValue(state.date, {emitEvent: false});
    this.filterBySolDate.setValue(state.sol, {emitEvent: false});
    this.dateFilterType = state.activeFilter;
    this.filterBySolDate.setValidators(Validators.max(state.maxSol))
  };

  @Output() date = new EventEmitter<Date>();
  @Output() sol = new EventEmitter<number>();
  @Output() latest = new EventEmitter<void>();
  @Output() saved = new EventEmitter<SavedFilter>();

  @ViewChild('picker') picker: MatDatepicker<Date>;

  filterBySolDate = new FormControl(1, Validators.max(0))
  filterByEarthDate = new FormControl({value: new Date(), disabled: false});
  stateName = StateName;
  showSolOverlay = false;
  state: ExplorerState;
  subs = new SubsHandler();
  dateFilterType: 'today' | 'date' | 'latest' | 'sol';

  constructor() {}

  ngOnInit(): void {
    this._statePush();
  }


  private _statePush(): void {
    this.subs.add = this.filterByEarthDate
    .valueChanges.subscribe((v: Date)=>{ 
      this.confirmDateFilterDate(v);
    });
  }
  

  isDateFilter(value: 'today' | 'date' | 'latest' | 'sol') {
    return this.dateFilterType === value;
  } 

  setDateFilter(select: 'today' | 'date' | 'latest' | 'sol') {
    this.dateFilterType = select
  }

  undoDateFilter() {
    this.dateFilterType = this.state.activeFilter
  }

  setDateFilterSol() {
    this.showSolOverlay = true;
    this.setDateFilter('sol')
  }

  confirmDateFilterSol() {
    this.showSolOverlay = false;
    this.sol.emit(this.filterBySolDate.value);
  }

  cancelDateFilterSol() {
    this.showSolOverlay = false;
    this.undoDateFilter()
  }
  
  setDateFilterLatest() {
    this.setDateFilter('latest');
    this.latest.emit();
  }

  setDateFilterDate() {
    this.setDateFilter('date');
    this.picker.open();
  }

  confirmDateFilterDate(v: Date)  {
    this.date.emit(v);
  }

  setSavedFilter(filter: SavedFilter) {
    this.saved.emit(filter)
  }

  ngOnDestroy() {
    this.subs.dispose();
  }

}