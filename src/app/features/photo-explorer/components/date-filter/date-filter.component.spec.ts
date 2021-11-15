import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterComponent } from './date-filter.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule } from '@angular/material/menu';
import { StateName } from '@feat/photo-explorer/state/explorer/explorer.state';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

describe('DateFilterComponent', () => {
  let component: DateFilterComponent;
  let fixture: ComponentFixture<DateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        OverlayModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
      ],
      declarations: [ DateFilterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFilterComponent);
    component = fixture.componentInstance;
    component.state = {
      name: StateName.Initial,
      rover: null,
      camera: null,
      page: 1,
      date: new Date(),
      sol: 1,
      maxSol: 1,
      maxEarthDate: null,
      savedFilters: [],
      activeFilter: 'today'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
